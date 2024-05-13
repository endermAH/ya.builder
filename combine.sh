#!/bin/bash

# Define the output file
output_file="combined.json"

folder="$1"
# Initialize an empty array to store file names
files=()

# Get all JSON files in the current directory and its subdirectories
while IFS=  read -r -d $'\0'; do
    files+=("$REPLY")
done < <(find $folder -type f -name "*.json" -print0)

# Check if any JSON files were found
if [ ${#files[@]} -eq 0 ]; then
    echo "No JSON files found."
    exit 1
fi

# Start building the combined JSON array
echo "{" > "$output_file"
for ((i = 0; i < ${#files[@]}; i++)); do
    # Add a comma before all but the first file
    if [ $i -gt 0 ]; then
        echo "," >> "$output_file"
    fi
    # Append the content of each JSON file to the output file
    sed '1d;$d' "${files[$i]}" >> "$output_file"
done
echo "}" >> "$output_file"

echo "Combined JSON file created: $output_file"