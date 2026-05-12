#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REQUIREMENTS=(
  "public/assets/brand/logo-dark.svg|public/assets/brand/logo-dark.png"
  "public/assets/brand/logo-light.svg|public/assets/brand/logo-light.png"
  "public/assets/brand/og-home.jpg|public/assets/brand/og-home.png"
  "public/assets/hero/hero-desktop.webp|public/assets/hero/hero-desktop.png"
  "public/assets/hero/hero-tablet.webp|public/assets/hero/hero-tablet.png"
  "public/assets/hero/hero-mobile.webp|public/assets/hero/hero-mobile.png"
  "public/assets/hero/phone-iso.png"
  "public/assets/hero/chip-incoming-call.svg"
  "public/assets/hero/chip-lead-qualified.svg"
  "public/assets/hero/chip-payment-secured.svg"
  "public/assets/hero/chip-job-dispatched.svg"
  "public/assets/hero/chip-tech-assigned.svg"
  "public/assets/hero/chip-client-notified.svg"
  "public/assets/hero/chip-follow-up.svg"
  "public/assets/hero/chip-emergency-no-heat.svg"
  "public/assets/sections/pain-revenue-leak.webp|public/assets/sections/pain-revenue-leak.png|public/assets/sections/pain-revenue-leak.svg"
  "public/assets/sections/compare-flow.svg"
  "public/assets/sections/how-step-icons.svg"
  "public/assets/integrations/jobber.svg"
  "public/assets/integrations/housecall-pro.svg"
  "public/assets/integrations/servicetitan.svg"
  "public/assets/integrations/quickbooks.svg"
  "public/assets/integrations/slack.svg"
)

present=0
missing=0

echo "P0 asset status"
echo "==============="
for req in "${REQUIREMENTS[@]}"; do
  IFS='|' read -r -a options <<< "$req"
  found=""
  for option in "${options[@]}"; do
    if [[ -f "$option" ]]; then
      found="$option"
      break
    fi
  done

  if [[ -n "$found" ]]; then
    echo "[present] $found"
    present=$((present+1))
  else
    echo "[missing] ${options[0]}"
    missing=$((missing+1))
  fi
done

echo
echo "summary: present=$present missing=$missing total=${#REQUIREMENTS[@]}"

if [[ $missing -gt 0 ]]; then
  exit 1
fi
