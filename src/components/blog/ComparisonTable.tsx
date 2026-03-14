"use client";

interface ComparisonTableProps {
  headers: [string, string, string]; // [feature, before, after]
  rows: [string, string, string][];
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface border-b border-white/5">
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-5 py-3.5 text-left font-semibold font-[family-name:var(--font-space-grotesk)] ${
                  i === 0
                    ? "text-foreground"
                    : i === 1
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-5 py-3.5 font-[family-name:var(--font-inter)] ${
                    j === 0
                      ? "text-foreground font-medium"
                      : "text-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
