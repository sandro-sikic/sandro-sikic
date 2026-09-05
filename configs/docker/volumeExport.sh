#!/usr/bin/env bash

# Require only the source volume name
 : ${1:?Source volume name is required}
SOURCE_VOLUME_NAME=${1}
# Destination file is automatically set to <source>.tar.gz
DESTINATION_ARCHIVE_FILE="${SOURCE_VOLUME_NAME}.tar.gz"

SOURCE_VOLUME_EXISTS=$(docker volume ls -q -f name="^${SOURCE_VOLUME_NAME}$")
VOLUME_COUNT=$(echo "$SOURCE_VOLUME_EXISTS" | wc -l)

DESTINATION_FILE_EXISTS=$(ls "${DESTINATION_ARCHIVE_FILE}" 2>/dev/null)

if [ "${SOURCE_VOLUME_NAME}" != "${SOURCE_VOLUME_EXISTS}" ]; then
  echo >&2 "Volume '${SOURCE_VOLUME_NAME}' does not exist"
  docker volume ls | grep "${SOURCE_VOLUME_NAME}"
  exit 1
fi

if [ "${DESTINATION_ARCHIVE_FILE}" == "${DESTINATION_FILE_EXISTS}" ]; then
  echo -n "Destination file '${DESTINATION_ARCHIVE_FILE}' already exists. It will be overwritten. [y/N] "
  read USER_CONFIRMATION
  if [ "${USER_CONFIRMATION}" != "y" ]; then
    echo 'Canceled'
    exit 0
  fi
  unlink "${DESTINATION_ARCHIVE_FILE}"
fi

echo "Export in progress"
docker run --rm \
  -v "${SOURCE_VOLUME_NAME}:/volume" \
  --workdir=/volume \
  busybox sh -c 'tar -cvOzf - .' >"${DESTINATION_ARCHIVE_FILE}"

# Show the details of the created archive file
ls -la | grep "${DESTINATION_ARCHIVE_FILE}"

