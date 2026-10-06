def smallest_goal_difference():
    smallest_difference = float("inf")
    team_name = None

    with open("football.dat", "r") as file:
        lines = file.readlines()

    for line in lines:
        parts = line.split()

        if len(parts) < 9:
            continue

        if not parts[0].replace(".", "").isdigit():
            continue

        team = parts[1]
        goals_for = int(parts[6])
        goals_against = int(parts[8])

        difference = abs(goals_for - goals_against)

        if difference < smallest_difference:
            smallest_difference = difference
            team_name = team

    return team_name


print(smallest_goal_difference())