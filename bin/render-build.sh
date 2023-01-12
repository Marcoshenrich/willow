#!/usr/bin/env bash
# exit on error
set -o errexit
npm run build --legacy-peer-deps
bundle install
rails db:migrate
rails db:seed #if needed