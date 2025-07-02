import time
from datetime import datetime, timezone
import re


def to_iso8601(timestamp=None, offset_seconds=None, iso_string=None):
    # Auto-detect ISO 8601 string if timestamp is a string
    if isinstance(timestamp, str) and not iso_string:
        iso_string = timestamp
        timestamp = None

    if iso_string:
        # Parse ISO 8601 string to datetime
        try:
            dt = datetime.fromisoformat(iso_string.replace('Z', '+00:00'))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
        except ValueError as e:
            raise ValueError(f"Invalid ISO 8601 string: {iso_string}") from e
    else:
        # Validate timestamp
        if timestamp is not None and not isinstance(timestamp, (int, float)):
            raise TypeError(f"timestamp must be a number, got {type(timestamp).__name__}")

        # Use current time if no timestamp provided
        if timestamp is None:
            timestamp = time.time()

        # Apply offset if provided
        if offset_seconds is not None:
            timestamp -= offset_seconds

        # Convert to UTC datetime
        try:
            dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
        except (TypeError, ValueError) as e:
            raise ValueError(f"Invalid timestamp: {timestamp}") from e

    # Format as ISO 8601 (millisecond precision)
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def to_timestamp(iso_string):
    try:
        dt = datetime.fromisoformat(iso_string.replace('Z', '+00:00'))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.timestamp()
    except ValueError as e:
        raise ValueError(f"Invalid ISO 8601 string: {iso_string}") from e


def generate_sliding_window(window_seconds=11.238, end_iso_string=None):
    if end_iso_string:
        end_time = to_iso8601(iso_string=end_iso_string)
        start_time = to_iso8601(timestamp=to_timestamp(end_iso_string), offset_seconds=window_seconds)
    else:
        end_time = to_iso8601()  # Current time (entSlidingTime)
        start_time = to_iso8601(offset_seconds=window_seconds)  # Window start time
    return end_time, start_time


# Example usage
if __name__ == "__main__":
    # Handle the specific ISO string
    iso_string = "2025-05-11T05:47:40.401+00:00"

    # Convert ISO string to ISO 8601 with 'Z' (auto-detect string)
    formatted = to_iso8601(iso_string)  # Pass as iso_string
    print("Formatted ISO 8601:", formatted)  # e.g., 2025-05-11T05:47:40.401Z

    # Convert ISO string to Unix timestamp
    timestamp = to_timestamp(iso_string)
    print("Unix timestamp:", timestamp)  # e.g., 1741663660.401

    # Generate sliding window with the ISO string as end time
    ent_time, start_time = generate_sliding_window(end_iso_string=iso_string)
    print("entSlidingTime:", ent_time)  # e.g., 2025-05-11T05:47:40.401Z
    print("startSlidingTime:", start_time)  # e.g., 2025-05-11T05:47:29.163Z

    # Use with current time
    end, start = generate_sliding_window()
    print("Current entSlidingTime:", end)
    print("Current startSlidingTime:", start)