"use client";

import { CodeBlock } from "@/components/blog/CodeBlock";
import { Callout } from "@/components/blog/Callout";
import { ComparisonTable } from "@/components/blog/ComparisonTable";
import { Prose, H2, H3, P, UL, OL, LI, Strong, InlineCode, Divider, BlockQuote } from "@/components/blog/Prose";
import { MigrationChecklist } from "@/components/blog/MigrationChecklist";
import { ArchitectureToggle } from "@/components/blog/diagrams/ArchitectureToggle";
import { SecurityComparison } from "@/components/blog/diagrams/SecurityComparison";
import { RequestFlow } from "@/components/blog/diagrams/RequestFlow";

export function CloudFrontVPCOriginsContent() {
  return (
    <Prose>
      <P>
        For years, every AWS architecture diagram I reviewed had the same pattern: CloudFront in front, an internet-facing Application Load Balancer behind it, and the application tucked away in private subnets. We all drew it. We all deployed it. And most of us believed it was secure.
      </P>
      <P>
        It wasn&apos;t. The ALB had a public IP address. Anyone with a port scanner could find it. Anyone who found it could bypass CloudFront entirely — skipping your WAF rules, your geo-restrictions, your rate limiting, everything. The entire security posture of your edge layer was built on a foundation of hope: <em>hope</em> that nobody would discover your origin.
      </P>
      <P>
        At re:Invent 2024, AWS announced <Strong>CloudFront VPC Origins</Strong> — a feature that changes this fundamentally. Your ALB can now be fully private. No public IP. No internet gateway route. No exposure. CloudFront connects to it through an AWS-managed private tunnel inside your VPC.
      </P>
      <P>
        This isn&apos;t an incremental improvement. This is an architectural shift from &quot;defense-in-depth around a public resource&quot; to &quot;the resource is simply not on the internet.&quot;
      </P>

      <Divider />

      <H2>The Architecture We All Built (And Why It Was Flawed)</H2>

      <P>
        Let me paint the picture. You&apos;re a platform engineer setting up a new service on AWS. You want CloudFront in front for caching, SSL termination, and WAF protection. Behind CloudFront, you place an Application Load Balancer to distribute traffic to your ECS tasks or EC2 instances in private subnets.
      </P>
      <P>
        Here&apos;s the catch: CloudFront needs to reach your ALB over the internet. So your ALB must be <Strong>internet-facing</Strong> — sitting in a public subnet with a public IP address.
      </P>

      <ArchitectureToggle />

      <P>
        The moment you make that ALB internet-facing, you&apos;ve created a backdoor to your application. Anyone can hit it directly, completely bypassing CloudFront and every security layer you&apos;ve carefully configured at the edge.
      </P>

      <H3>The Workarounds We Invented</H3>

      <P>
        The industry responded with a stack of workarounds. Each one added complexity, and none of them solved the fundamental problem.
      </P>

      <H3>Workaround 1: Custom Header Injection</H3>

      <P>
        The most common approach: configure CloudFront to inject a secret custom header on every origin request, then configure the ALB to reject any request without that header.
      </P>

      <CodeBlock
        language="yaml"
        filename="cloudfront-origin-config.yaml"
        code={`# CloudFront Origin Custom Headers
Origins:
  - DomainName: my-alb-123456.us-east-1.elb.amazonaws.com
    CustomOriginConfig:
      HTTPPort: 80
      HTTPSPort: 443
      OriginProtocolPolicy: https-only
    OriginCustomHeaders:
      - HeaderName: X-Custom-Verify
        HeaderValue: "aB3$kL9#mN7@pQ2&wR5"  # This is your "security"`}
        highlightLines={[8, 9]}
      />

      <CodeBlock
        language="json"
        filename="alb-listener-rule.json"
        code={`{
  "Conditions": [
    {
      "Field": "http-header",
      "HttpHeaderConfig": {
        "HttpHeaderName": "X-Custom-Verify",
        "Values": ["aB3$kL9#mN7@pQ2&wR5"]
      }
    }
  ],
  "Actions": [
    {
      "Type": "forward",
      "TargetGroupArn": "arn:aws:elasticloadbalancing:..."
    }
  ]
}`}
        highlightLines={[7]}
      />

      <Callout type="danger" title="The Problem with Secret Headers">
        You&apos;re treating an HTTP header value as a security credential. This value can leak through access logs, error messages, debug endpoints, monitoring tools, or any middleware that logs request headers. If it leaks, your entire security model collapses — and you might not even know it happened.
      </Callout>

      <H3>Workaround 2: CloudFront Managed Prefix List</H3>

      <P>
        AWS publishes the IP ranges used by CloudFront edge locations as a managed prefix list. You can reference this in your ALB&apos;s security group to only allow traffic from CloudFront IPs.
      </P>

      <CodeBlock
        language="hcl"
        filename="security-group.tf"
        code={`resource "aws_security_group_rule" "alb_from_cloudfront" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  prefix_list_ids   = [data.aws_ec2_managed_prefix_list.cloudfront.id]
}

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}`}
      />

      <P>
        This restricts access at Layer 3/4, but it allows traffic from <em>any</em> CloudFront distribution — not just yours. An attacker could set up their own CloudFront distribution pointing to your ALB and route traffic through it.
      </P>

      <H3>Workaround 3: WAF on the ALB</H3>

      <P>
        Some teams deploy a second WAF directly on the ALB as yet another layer of protection. This means you&apos;re paying for WAF twice and managing two rulesets — one at the edge and one at the origin.
      </P>

      <H3>Workaround 4: Regular Header Rotation</H3>

      <P>
        Because the custom header is effectively a shared secret, security best practices demand regular rotation. This is a careful 4-step manual process:
      </P>

      <OL>
        <LI>Add the new header value to CloudFront</LI>
        <LI>Update the ALB listener rule to accept both old and new values</LI>
        <LI>Remove the old header from CloudFront</LI>
        <LI>Update the ALB listener rule to only accept the new value</LI>
      </OL>

      <P>
        Get the order wrong, and you either break production or leave the old secret active.
      </P>

      <Callout type="warning" title="The Real Issue">
        All these workarounds are defense-in-depth around a <Strong>fundamentally public resource</Strong>. You&apos;re layering security controls on top of an architecture that should never have had a public endpoint in the first place. The ALB&apos;s public IP is the root cause — and no amount of headers, prefix lists, or WAF rules can change that.
      </Callout>

      <Divider />

      <H2>Enter CloudFront VPC Origins</H2>

      <P>
        At re:Invent 2024, AWS introduced <Strong>CloudFront VPC Origins</Strong>. The concept is beautifully simple: CloudFront can now connect to origins inside your VPC&apos;s private subnets without those origins needing any public internet exposure.
      </P>

      <ArchitectureToggle defaultView="after" />

      <H3>How It Works Under the Hood</H3>

      <P>
        When you create a VPC Origin, AWS does something elegant:
      </P>

      <OL>
        <LI>CloudFront creates a <Strong>service-managed Elastic Network Interface (ENI)</Strong> inside your specified private subnet</LI>
        <LI>This ENI acts as a bridge between CloudFront&apos;s edge network and your VPC</LI>
        <LI>Traffic flows from CloudFront edge locations through this ENI to your private ALB over a <Strong>private, AWS-managed connection</Strong></LI>
        <LI>CloudFront also creates a <Strong>service-managed security group</Strong> named <InlineCode>CloudFront-VPCOrigins-Service-SG</InlineCode> that you can reference in your ALB&apos;s security group</LI>
      </OL>

      <P>
        The traffic <Strong>never traverses the public internet</Strong>. It stays entirely within AWS&apos;s private network backbone.
      </P>

      <RequestFlow />

      <H3>What Can Be a VPC Origin?</H3>

      <UL>
        <LI><Strong>Application Load Balancers (ALBs)</Strong> — in private subnets</LI>
        <LI><Strong>Network Load Balancers (NLBs)</Strong> — in private subnets (non-TLS listeners only)</LI>
        <LI><Strong>EC2 Instances</Strong> — in private subnets</LI>
      </UL>

      <Divider />

      <H2>Security: Before vs After</H2>

      <P>
        This is where the &quot;10x security improvement&quot; claim becomes clear. Let me break down every attack vector and show how VPC Origins eliminates each one.
      </P>

      <SecurityComparison />

      <ComparisonTable
        headers={["Security Aspect", "Public ALB (Before)", "VPC Origins (After)"]}
        rows={[
          ["Origin Exposure", "Public IP, discoverable via scanning", "No public IP — completely invisible"],
          ["CloudFront Bypass", "Anyone can hit ALB directly", "Impossible — ALB not on the internet"],
          ["Custom Header Dependency", "Required (fragile, can leak)", "Not needed at all"],
          ["Header Rotation", "Manual 4-step process, periodic", "N/A — no shared secrets"],
          ["WAF on Origin", "Often needed as extra protection", "Optional — defense in depth only"],
          ["Security Group Complexity", "Prefix list + header rules + listener rules", "Reference CloudFront service SG"],
          ["DDoS on Origin", "Origin IP exposed to direct DDoS", "DDoS only hits CloudFront edge (Shield)"],
          ["Compliance Posture", "Origin is technically public", "Origin is provably private"],
          ["Configuration Drift", "High (many manual pieces)", "Low (AWS-managed connection)"],
        ]}
      />

      <BlockQuote>
        <P>
          The shift isn&apos;t from &quot;somewhat secure&quot; to &quot;more secure.&quot; It&apos;s from &quot;we hope nobody finds the ALB&quot; to &quot;the ALB literally cannot be found.&quot; That&apos;s not a 10% improvement — it&apos;s an architectural elimination of the entire attack class.
        </P>
      </BlockQuote>

      <Divider />

      <H2>Implementation Guide</H2>

      <P>
        Let me walk you through setting up CloudFront VPC Origins from scratch, and then cover migrating an existing public ALB setup.
      </P>

      <H3>Prerequisites</H3>

      <UL>
        <LI>A VPC with an <Strong>Internet Gateway attached</Strong> (required by CloudFront even though the subnet is private)</LI>
        <LI>A <Strong>private subnet</Strong> with at least one available IPv4 address (IPv6-only subnets are not supported)</LI>
        <LI>Your origin resource (ALB/NLB/EC2) deployed and in <Strong>Active</Strong> status in the private subnet</LI>
        <LI>A security group attached to the origin resource</LI>
      </UL>

      <Callout type="info" title="Why Does the VPC Need an Internet Gateway?">
        This is a common question. The IGW is required at the VPC level for CloudFront to establish the private connection, but your <Strong>private subnet does NOT need a route to the IGW</Strong>. The subnet remains genuinely private — the IGW is an infrastructure prerequisite, not a traffic path.
      </Callout>

      <H3>Step 1: Create a Private ALB</H3>

      <P>
        If you&apos;re starting fresh, create an internal ALB in your private subnet:
      </P>

      <CodeBlock
        language="hcl"
        filename="alb.tf"
        code={`resource "aws_lb" "private" {
  name               = "app-private-alb"
  internal           = true  # This is the key — internal only
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.private_subnet_ids

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.private.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}`}
        highlightLines={[3]}
      />

      <H3>Step 2: Create the VPC Origin</H3>

      <CodeBlock
        language="hcl"
        filename="vpc-origin.tf"
        code={`resource "aws_cloudfront_vpc_origin" "alb" {
  vpc_origin_endpoint_config {
    name                   = "private-alb-origin"
    arn                    = aws_lb.private.arn
    http_port              = 80
    https_port             = 443
    origin_protocol_policy = "https-only"

    origin_ssl_protocols {
      items    = ["TLSv1.2"]
      quantity = 1
    }
  }

  tags = {
    Environment = "production"
  }
}

# Wait for VPC origin to be deployed (can take up to 15 minutes)
# The status will change from "Deploying" to "Deployed"`}
        highlightLines={[4, 7]}
      />

      <H3>Step 3: Configure Security Groups</H3>

      <P>
        After the VPC Origin is created, AWS provisions a service-managed security group. Use it to lock down your ALB:
      </P>

      <CodeBlock
        language="hcl"
        filename="security-groups.tf"
        code={`resource "aws_security_group" "alb" {
  name        = "private-alb-sg"
  description = "Security group for private ALB - CloudFront VPC Origin only"
  vpc_id      = var.vpc_id

  # Only allow traffic from CloudFront VPC Origins service SG
  ingress {
    description     = "HTTPS from CloudFront VPC Origin"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [data.aws_security_group.cloudfront_vpc_origins.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Reference the CloudFront-managed security group
data "aws_security_group" "cloudfront_vpc_origins" {
  filter {
    name   = "group-name"
    values = ["CloudFront-VPCOrigins-Service-SG"]
  }

  vpc_id = var.vpc_id
}`}
        highlightLines={[12, 13]}
      />

      <Callout type="tip" title="Service-Managed SG vs Prefix List">
        You have two options for security groups. The <Strong>service-managed SG</Strong> (<InlineCode>CloudFront-VPCOrigins-Service-SG</InlineCode>) is the recommended approach because it restricts traffic to only <em>your</em> CloudFront distributions. The managed prefix list allows traffic from <em>any</em> CloudFront distribution, which is less restrictive.
      </Callout>

      <H3>Step 4: Create the CloudFront Distribution</H3>

      <CodeBlock
        language="hcl"
        filename="cloudfront.tf"
        code={`resource "aws_cloudfront_distribution" "app" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "App distribution with VPC Origin"
  default_root_object = "index.html"
  aliases             = ["app.example.com"]

  origin {
    domain_name = aws_lb.private.dns_name
    origin_id   = "private-alb"

    vpc_origin_config {
      vpc_origin_id            = aws_cloudfront_vpc_origin.alb.id
      origin_keepalive_timeout = 5
      origin_read_timeout      = 30
    }
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "private-alb"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true
      headers      = ["Host", "Origin", "Authorization"]

      cookies {
        forward = "all"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.cloudfront_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  web_acl_id = aws_wafv2_web_acl.app.arn

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}`}
        highlightLines={[12, 13, 14, 15, 16]}
      />

      <Divider />

      <H2>Migrating an Existing Public ALB</H2>

      <P>
        If you already have a public ALB + CloudFront setup, AWS provides a safe migration path using <Strong>Continuous Deployment</Strong> (staging distributions). Here&apos;s the recommended approach:
      </P>

      <MigrationChecklist />

      <CodeBlock
        language="bash"
        filename="migration-commands.sh"
        code={`# Step 1: Create VPC Origin
aws cloudfront create-vpc-origin \\
  --vpc-origin-endpoint-config '{
    "Name": "private-alb-origin",
    "Arn": "arn:aws:elasticloadbalancing:us-east-1:123456789:loadbalancer/app/my-private-alb/abc123",
    "HTTPPort": 80,
    "HTTPSPort": 443,
    "OriginProtocolPolicy": "https-only",
    "OriginSslProtocols": {
      "Items": ["TLSv1.2"],
      "Quantity": 1
    }
  }'

# Step 2: Check deployment status (wait for "Deployed")
aws cloudfront get-vpc-origin --id EVPC_ORIGIN_ID \\
  --query 'VpcOrigin.Status'

# Step 3: Create staging distribution via continuous deployment
aws cloudfront create-continuous-deployment-policy \\
  --continuous-deployment-policy-config '{
    "StagingDistributionDnsNames": {
      "Items": ["staging.example.com"],
      "Quantity": 1
    },
    "Enabled": true,
    "TrafficConfig": {
      "SingleWeightConfig": {
        "Weight": 0.1
      },
      "Type": "SingleWeight"
    }
  }'

# Step 4: After testing, promote staging to production
aws cloudfront update-distribution-with-staging-config \\
  --id E_PRODUCTION_DIST_ID \\
  --staging-distribution-id E_STAGING_DIST_ID`}
      />

      <Callout type="warning" title="Migration Consideration">
        VPC Origin deployment can take up to 15 minutes. To update a VPC Origin, you must first disassociate it from all distributions, edit it, wait for redeployment, then re-associate. Plan your maintenance windows accordingly.
      </Callout>

      <Divider />

      <H2>Limitations to Know</H2>

      <P>
        VPC Origins are powerful, but there are important constraints to be aware of:
      </P>

      <UL>
        <LI><Strong>No WebSocket support</Strong> — if your application uses WebSockets, you&apos;ll need an alternative path (e.g., API Gateway WebSocket API)</LI>
        <LI><Strong>No gRPC support</Strong> — gRPC traffic cannot flow through VPC Origins</LI>
        <LI><Strong>No Lambda@Edge on origin events</Strong> — origin-request and origin-response Lambda@Edge triggers are not supported</LI>
        <LI><Strong>NLB restrictions</Strong> — dual-stack NLBs, NLBs with TLS listeners, and NLBs without security groups are not supported</LI>
        <LI><Strong>IPv4 required</Strong> — the private subnet needs at least one available IPv4 address; IPv6-only subnets are not supported</LI>
        <LI><Strong>No Gateway Load Balancers</Strong> — only ALB, NLB, and EC2 instances are supported</LI>
      </UL>

      <Callout type="info" title="Cross-Account Support (Added November 2025)">
        As of November 2025, VPC Origins support <Strong>cross-account sharing</Strong> via AWS Resource Access Manager (RAM). This is particularly useful for centralized networking architectures where CloudFront distributions live in one account while application workloads run in another.
      </Callout>

      <Divider />

      <H2>Cost Implications</H2>

      <P>
        Switching to VPC Origins can actually <Strong>reduce your AWS bill</Strong>:
      </P>

      <UL>
        <LI><Strong>No extra WAF costs</Strong> — you no longer need WAF on the ALB (only on CloudFront)</LI>
        <LI><Strong>No public subnet overhead</Strong> — fewer NAT gateways, fewer public IPs, simpler networking</LI>
        <LI><Strong>No Elastic IP costs</Strong> — internal ALBs don&apos;t use public IPs</LI>
        <LI><Strong>VPC Origins itself has no additional charge</Strong> — you only pay standard CloudFront data transfer rates</LI>
        <LI><Strong>Reduced operational cost</Strong> — no header rotation automation, simpler security group management</LI>
      </UL>

      <Divider />

      <H2>The Bigger Picture</H2>

      <P>
        CloudFront VPC Origins represents a broader shift in AWS&apos;s approach to edge-to-origin connectivity. For years, the boundary between CloudFront and your VPC required a public endpoint. Now, AWS is erasing that boundary.
      </P>

      <P>
        If you&apos;re a platform engineer, this should be high on your migration backlog. The security gains are not marginal — they&apos;re architectural. You&apos;re not adding another lock to a door that&apos;s on a public street. You&apos;re moving the door inside a building that has no street entrance.
      </P>

      <P>
        The custom header approach served us well for years. It was the best we had. But it was always a workaround for a missing feature. That feature has now arrived.
      </P>

      <BlockQuote>
        <P>
          The best security is when the resource you&apos;re protecting doesn&apos;t exist on the attack surface at all. VPC Origins makes that possible for your ALB.
        </P>
      </BlockQuote>

      <Divider />

      <H2>TL;DR</H2>

      <UL>
        <LI><Strong>Before:</Strong> CloudFront → Public Internet → Public ALB (bypassable) → Private App</LI>
        <LI><Strong>After:</Strong> CloudFront → AWS Private Network → Private ALB (unreachable from internet) → Private App</LI>
        <LI><Strong>Key benefit:</Strong> Your origin has zero public exposure. No IP to scan, no headers to leak, no workarounds to maintain.</LI>
        <LI><Strong>Migration:</Strong> Use CloudFront Continuous Deployment for zero-downtime cutover.</LI>
        <LI><Strong>Cost:</Strong> VPC Origins has no additional charge. You likely save money by eliminating redundant WAF and public infrastructure.</LI>
      </UL>
    </Prose>
  );
}
