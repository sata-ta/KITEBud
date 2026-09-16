#!/bin/bash

set -e

echo "Creating virtual environment..."

python3.12 -m venv .venv

echo "Activating virtual environment..."

source .venv/bin/activate

echo "Upgrading pip..."

python -m pip install --upgrade pip

echo "Installing dependencies..."

python -m pip install -r requirements.txt

echo "Setup complete!"