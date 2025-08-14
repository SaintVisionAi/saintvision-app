#!/usr/bin/env bash
set -euo pipefail
echo "🔎 Scanning for object default exports used as components…"
grep -RInE 'export default\s*{' app components lib || true
grep -RInE 'module\.exports\s*=\s*{' app components lib || true
grep -RInE 'export\s+const\s+\w+\s*=\s*{[^;]*$' app components lib | grep -v "\.json" || true
echo "🔎 Searching for files containing 'Claude'…"
grep -RIn "Claude" app components lib || true
