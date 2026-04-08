"use client";

import { CodeBlock } from "@/components/blog/CodeBlock";
import { Callout } from "@/components/blog/Callout";
import { ComparisonTable } from "@/components/blog/ComparisonTable";
import { Prose, H2, H3, P, UL, OL, LI, Strong, InlineCode, Divider, BlockQuote } from "@/components/blog/Prose";
import { BlogImage } from "@/components/blog/BlogImage";
import { S3FilesArchitecture } from "@/components/blog/diagrams/S3FilesArchitecture";

export function S3FilesContent() {
  return (
    <Prose>
      <P>
        For over a decade, AWS had two separate storage worlds: S3 for cheap, durable object storage accessed via HTTP APIs, and file systems (EFS, FSx) for POSIX access over NFS. If your workload needed both — ML training pipelines reading datasets, agentic AI agents sharing files, data pipelines staging results — you either rewrote your code to use the S3 SDK, ran a sync job between S3 and EFS, or used a FUSE-based workaround with significant limitations.
      </P>
      <P>
        On April 7, 2026, AWS launched <Strong>Amazon S3 Files</Strong> — a managed file system backed directly by an S3 bucket. Your compute resources mount it over NFS v4.1 and use standard file system calls. Every write syncs back to your S3 bucket as a regular S3 object, accessible via SDK, CLI, or console. No agents. No sync jobs. No code changes to existing tools.
      </P>
      <P>
        I set this up in my own account end-to-end. Here&apos;s exactly how to do it, what to watch out for, and what&apos;s actually going on under the hood.
      </P>

      <Divider />

      <H2>How It Works</H2>

      <P>
        S3 Files is built on Amazon EFS infrastructure. When you create an S3 file system, AWS provisions NFS mount targets in your VPC. Your compute resources (EC2, ECS, EKS, Lambda) mount these targets over NFS v4.1 and see your S3 objects as files and directories.
      </P>

      <S3FilesArchitecture />

      <P>
        A few accuracy notes on the internals that are worth understanding:
      </P>

      <UL>
        <LI><Strong>Active data gets cached</Strong> on EFS high-performance storage (~1ms latency). Files not in the cache are served directly from S3, which maximises throughput for large sequential reads.</LI>
        <LI><Strong>Consistency model is NFS close-to-open</Strong> — writes from one client become visible to another client after the writing client closes the file. Not real-time, but reliable for the workloads this is designed for.</LI>
        <LI><Strong>S3 sync is async</Strong> — writes land on the EFS-backed file system first, then S3 automatically reflects them as new objects or new versions within minutes. Reads from the S3 side may lag slightly.</LI>
        <LI><Strong>POSIX permissions</Strong> use UID/GID stored as S3 object metadata. The file system enforces them on access.</LI>
        <LI><Strong>Encryption</Strong>: TLS 1.3 in transit, SSE-S3 or KMS at rest — no additional config needed.</LI>
      </UL>

      <Callout type="info" title="Not the Same as Mountpoint for S3">
        AWS has an open-source tool called <Strong>Mountpoint for Amazon S3</Strong> (s3fs-fuse). S3 Files is different — it&apos;s a fully managed service with complete NFS v4.1 semantics, including writes, renames, and locks. You install no software on your instances beyond the <InlineCode>amazon-efs-utils</InlineCode> package (pre-installed on AWS AMIs).
      </Callout>

      <Divider />

      <H2>Step-by-Step Setup</H2>

      <P>
        Here&apos;s the full walkthrough — from an existing S3 bucket to a working mount on an EC2 instance.
      </P>

      <H3>Prerequisites</H3>

      <UL>
        <LI>An S3 bucket with <Strong>versioning enabled</Strong> (required by S3 Files)</LI>
        <LI>An EC2 instance in a VPC (Amazon Linux 2 or AL2023 recommended — <InlineCode>amazon-efs-utils</InlineCode> is pre-installed)</LI>
        <LI>An IAM role attached to the EC2 instance with the necessary permissions (covered below)</LI>
      </UL>

      <H3>Step 1: Navigate to S3 Files</H3>

      <P>
        S3 Files lives inside the S3 console — not EFS. Go to the <Strong>S3 service</Strong>, then in the left sidebar select <Strong>Files</Strong> → <Strong>File systems</Strong>. Click <Strong>Create file system</Strong>.
      </P>

      <P>
        In the create dialog, select your bucket (versioning must be enabled) and the VPC where your EC2 instance lives. Click <Strong>Create file system</Strong>. The file system appears immediately in <Strong>Creating</Strong> state:
      </P>

      <BlogImage
        src="/blog/s3-files/04-mount-targets-creating.png"
        alt="File system in Creating state right after creation"
        caption="File system created — mount targets start provisioning across AZs automatically."
      />

      <H3>Step 2: Wait for Mount Targets</H3>

      <P>
        AWS provisions NFS mount targets in each AZ of your VPC. Wait a few minutes until they flip to <Strong>Available</Strong>:
      </P>

      <BlogImage
        src="/blog/s3-files/02-mount-targets-available.png"
        alt="Mount targets in Available state"
        caption="All mount targets showing Available — the file system is ready."
      />

      <H3>Step 3: IAM Permissions</H3>

      <P>
        Your EC2 instance role needs permissions for both the file system and the underlying S3 bucket. You can use the <Strong>AWS managed policy</Strong> <InlineCode>AmazonS3FilesFullAccess</InlineCode> for quick setup, or create a scoped inline policy:
      </P>

      <CodeBlock
        language="json"
        filename="s3-files-iam-policy.json"
        code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3FilesMount",
      "Effect": "Allow",
      "Action": [
        "elasticfilesystem:ClientMount",
        "elasticfilesystem:ClientWrite",
        "elasticfilesystem:DescribeMountTargets"
      ],
      "Resource": "arn:aws:s3files:<region>:<account-id>:file-system/<fs-id>"
    },
    {
      "Sid": "S3BucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::<your-bucket>",
        "arn:aws:s3:::<your-bucket>/*"
      ]
    }
  ]
}`}
        highlightLines={[6, 7, 8, 16, 17, 18, 19]}
      />

      <BlogImage
        src="/blog/s3-files/03-iam-policies.png"
        alt="IAM policies for S3 Files"
        caption="The EC2 role needs both EFS (for the NFS mount) and S3 (for data read/write) permissions."
      />

      <H3>Step 4: Security Group</H3>

      <P>
        The mount targets need NFS traffic on port <Strong>2049</Strong> from your EC2 instance. Add an inbound rule on the mount target&apos;s security group allowing TCP 2049 from your EC2 instance&apos;s security group (or subnet CIDR).
      </P>

      <BlogImage
        src="/blog/s3-files/06-security-group.png"
        alt="Security group with NFS inbound rule on port 2049"
        caption="NFS inbound rule (TCP 2049) on the mount target security group."
      />

      <H3>Step 5: Copy the File System ID</H3>

      <P>
        Back in the S3 Files console, note the <Strong>File system ID</Strong> (format: <InlineCode>fs-xxxxxxxx</InlineCode>) from the file system details page. You&apos;ll use this in the mount command. You can also click <Strong>Attach</Strong> on the file system to get the pre-generated mount command with the correct ID already filled in.
      </P>

      <BlogImage
        src="/blog/s3-files/07-filesystem-created.png"
        alt="S3 Files file system details showing file system ID"
        caption="File system created and active — copy the fs-ID shown here."
      />

      <H3>Step 6: Mount via EC2 Instance Connect</H3>

      <P>
        Open <Strong>EC2 Instance Connect</Strong> from the EC2 console to get a browser-based terminal — no SSH key setup needed. Then run:
      </P>

      <CodeBlock
        language="bash"
        filename="mount-s3-files.sh"
        code={`# Create the mount point directory
sudo mkdir -p /home/ec2-user/s3files

# Mount the file system (replace fs-ID with yours)
sudo mount -t s3files fs-0xxxxxxxxx:/ /home/ec2-user/s3files`}
        highlightLines={[4]}
      />

      <Callout type="info" title="amazon-efs-utils is pre-installed on AWS AMIs">
        The <InlineCode>mount -t s3files</InlineCode> command requires the <InlineCode>amazon-efs-utils</InlineCode> package. It is pre-installed on Amazon Linux 2 and AL2023 AMIs. On Ubuntu, run <InlineCode>sudo apt-get install -y amazon-efs-utils</InlineCode> first.
      </Callout>

      <BlogImage
        src="/blog/s3-files/10-mount-success.png"
        alt="Successful mount in terminal via EC2 Instance Connect"
        caption="Mount confirmed via EC2 Instance Connect — the file system is live and writable."
      />

      <P>
        From here, standard file operations work as expected. Files written to the mount appear in the S3 bucket as regular objects within minutes:
      </P>

      <CodeBlock
        language="bash"
        filename="test-s3-files.sh"
        code={`# Write a file through the mount
echo "Hello S3 Files" > /home/ec2-user/s3files/hello.txt

# Verify locally
ls -al /home/ec2-user/s3files/hello.txt

# Within minutes, it appears in S3 as a regular object
aws s3 ls s3://your-bucket/hello.txt`}
      />

      <Callout type="tip" title="Persist the mount across reboots">
        Add to <InlineCode>/etc/fstab</InlineCode>:<br />
        <InlineCode>fs-0xxxxxxxxx:/ /home/ec2-user/s3files s3files _netdev,tls,iam 0 0</InlineCode><br />
        The <InlineCode>iam</InlineCode> option uses the instance&apos;s IAM role automatically — no credentials to manage.
      </Callout>

      <Divider />

      <H2>Attaching from the EC2 Console</H2>

      <P>
        Alternatively, you can attach the file system when launching or modifying an EC2 instance directly from the EC2 console. AWS generates the user data script automatically, selecting the right subnet and mount point. This is handy when you want the instance to come up with the file system already mounted.
      </P>

      <Divider />

      <H2>When to Use S3 Files</H2>

      <P>
        S3 Files is the right tool when you need <Strong>file system semantics on top of S3 data</Strong> — shared access across multiple compute resources, standard file I/O without SDK changes, and automatic durability through S3.
      </P>

      <UL>
        <LI><Strong>ML training pipelines</Strong> — point PyTorch DataLoader, Hugging Face datasets, or any training framework at a file path. The data comes from S3 without rewriting any code.</LI>
        <LI><Strong>Agentic AI workloads</Strong> — multiple agents reading and writing files concurrently. NFS close-to-open consistency ensures a write from one agent is seen by others after file close.</LI>
        <LI><Strong>Data pipelines staging intermediate results</Strong> — write to the mount, downstream consumers read from S3 directly.</LI>
        <LI><Strong>Any tool that expects a file path</Strong> — legacy tools, shell scripts, Python libraries that use <InlineCode>open()</InlineCode> — they all work without modification.</LI>
      </UL>

      <Callout type="warning" title="Not for these workloads">
        S3 Files is not a block store replacement. Don&apos;t run databases on it. For HPC/GPU clusters needing sub-millisecond IOPS, use <Strong>FSx for Lustre</Strong>. For on-premises NAS migration, use <Strong>FSx for NetApp ONTAP</Strong>. For general-purpose shared file systems without an S3 backing requirement, standard <Strong>EFS</Strong> is simpler.
      </Callout>

      <H2>S3 Files vs. Other Options</H2>

      <ComparisonTable
        headers={["Aspect", "EFS / FSx", "S3 Files"]}
        rows={[
          ["Access protocol", "NFS v4.1 / SMB / Lustre", "NFS v4.1"],
          ["Backing store", "Internal (no S3 access)", "Your S3 bucket (objects visible)"],
          ["POSIX semantics", "Full", "Full (UID/GID in S3 metadata)"],
          ["Consistency", "Strong / close-to-open", "NFS close-to-open"],
          ["Data accessible via S3 API", "No", "Yes — same objects"],
          ["Code changes needed", "No", "No"],
          ["Bucket versioning req.", "N/A", "Required"],
          ["Storage cost", "EFS/FSx pricing", "S3 pricing (much cheaper)"],
          ["Best for", "NAS migration, HPC, general", "ML/AI, pipelines, S3-backed apps"],
        ]}
      />

      <Divider />

      <H2>Pricing</H2>

      <P>
        You pay for three things: storage used in the file system (at S3 rates), small file reads and all write operations to the file system, and S3 API requests during synchronisation between the file system and your bucket. Check the <a href="https://aws.amazon.com/s3/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">S3 pricing page</a> for the S3 Files tier — storage is billed at S3 rates, which is significantly cheaper than EFS for large datasets.
      </P>

      <Divider />

      <H2>Summary</H2>

      <UL>
        <LI>S3 Files is created from the <Strong>S3 console</Strong> (S3 → Files → File systems), not EFS</LI>
        <LI>Your bucket needs <Strong>versioning enabled</Strong></LI>
        <LI>Mount targets are created automatically in your VPC — wait for <Strong>Available</Strong> status</LI>
        <LI>Mount with <InlineCode>mount -t s3files</InlineCode> using the <InlineCode>amazon-efs-utils</InlineCode> package</LI>
        <LI>Files written through the mount appear in the S3 bucket as regular objects within minutes</LI>
        <LI>Consistency is <Strong>NFS close-to-open</Strong> — not real-time, but predictable</LI>
        <LI>Works with any NFS-capable client: EC2, ECS, EKS, Lambda</LI>
      </UL>

      <BlockQuote>
        <P>
          The biggest practical win: existing tools that expect a file path just work. No boto3, no SDK wrappers, no sync cron. Point your tool at <InlineCode>/mnt/s3files/</InlineCode> and it reads and writes S3 objects transparently.
        </P>
      </BlockQuote>
    </Prose>
  );
}

