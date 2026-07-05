#!/usr/bin/env bash
set -euo pipefail

DART_SASS_VERSION=1.101.0
GO_VERSION=1.26.4
HUGO_VERSION=0.163.3
TZ=Asia/Taipei
HUGO_CACHEDIR="${PWD}/.vercel/cache/hugo"

cleanup() {
  if [[ -n "${build_temp_dir:-}" && -d "${build_temp_dir}" ]]; then
    rm -rf "${build_temp_dir}"
  fi
}

trap cleanup EXIT SIGINT SIGTERM

main() {
  export TZ
  export HUGO_CACHEDIR

  build_temp_dir=$(mktemp -d)
  mkdir -p "${HOME}/.local"

  if ! command -v sass >/dev/null 2>&1; then
    echo "Installing Dart Sass ${DART_SASS_VERSION}..."
    curl -sfL --output-dir "${build_temp_dir}" -O "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
    tar -C "${HOME}/.local" -xf "${build_temp_dir}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
    export PATH="${HOME}/.local/dart-sass:${PATH}"
  fi

  if [[ -f "go.mod" ]] && ! command -v go >/dev/null 2>&1; then
    echo "Installing Go ${GO_VERSION}..."
    curl -sfL --output-dir "${build_temp_dir}" -O "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
    tar -C "${HOME}/.local" -xf "${build_temp_dir}/go${GO_VERSION}.linux-amd64.tar.gz"
    export PATH="${HOME}/.local/go/bin:${PATH}"
  fi

  if ! command -v hugo >/dev/null 2>&1; then
    echo "Installing Hugo ${HUGO_VERSION}..."
    curl -sfL --output-dir "${build_temp_dir}" -O "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz"
    mkdir -p "${HOME}/.local/hugo"
    tar -C "${HOME}/.local/hugo" -xf "${build_temp_dir}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz"
    export PATH="${HOME}/.local/hugo:${PATH}"
  fi

  echo "Tool versions:"
  command -v sass >/dev/null 2>&1 && echo "Dart Sass: $(sass --version)"
  command -v go >/dev/null 2>&1 && echo "Go: $(go version)"
  command -v hugo >/dev/null 2>&1 && echo "Hugo: $(hugo version)"

  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git config --global core.quotepath false
    if [[ "$(git rev-parse --is-shallow-repository)" == "true" ]]; then
      git fetch --unshallow
    fi
    if [[ -f .gitmodules ]]; then
      git submodule update --init --recursive
    fi
  fi

  hugo build --gc --minify
}

main "$@"

