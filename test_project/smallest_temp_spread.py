def smallest_temperature_spread():
    smallest_spread = float("inf")
    smallest_day = None

    with open("weather.dat", 'r') as weather:
        lines = weather.readlines()

    for line in lines:
        parts = line.split()

        # Skip invalid/header lines
        if len(parts) < 3 or not parts[0].isdigit():
            continue

        day = parts[0]
        max_temp = int(parts[1].replace("*", ""))
        min_temp = int(parts[2].replace("*", ""))

        temp_spread = abs(max_temp - min_temp)

        if temp_spread < smallest_spread:
            smallest_spread = temp_spread
            smallest_day = day

    return smallest_day


print(smallest_temperature_spread())