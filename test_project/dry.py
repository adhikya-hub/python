def find_smallest_difference(
    filename,
    value1_index,
    value2_index,
    result_index,
    valid_line_check,
):
    smallest_difference = float("inf")
    result = None

    with open(filename, "r") as file:
        lines = file.readlines()

    for line in lines:
        parts = line.split()

        if not valid_line_check(parts):
            continue

        value1 = int(parts[value1_index].replace("*", ""))
        value2 = int(parts[value2_index].replace("*", ""))

        difference = abs(value1 - value2)

        if difference < smallest_difference:
            smallest_difference = difference
            result = parts[result_index]

    return result


weather_result = find_smallest_difference(
    filename="weather.dat",
    value1_index=1,
    value2_index=2,
    result_index=0,
    valid_line_check=lambda parts: len(parts) >= 3 and parts[0].isdigit(),
)

football_result = find_smallest_difference(
    filename="football.dat",
    value1_index=6,
    value2_index=8,
    result_index=1,
    valid_line_check=lambda parts: len(parts) >= 9
    and parts[0].replace(".", "").isdigit(),
)

print("Weather Day:", weather_result)
print("Football Team:", football_result)