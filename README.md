# Pyramid + Statue Construction Simulator (Tasker Method) - Skeleton Code

# ===============================================
# 1. Import necessary modules
# ===============================================
import math
import random
import time

# ===============================================
# 2. Define Global Constants (realistic placeholders)
# ===============================================
GRAVITY = 9.81  # m/s^2
AVERAGE_BLOCK_WEIGHT = 2500  # kg
AVERAGE_STATUE_WEIGHT = 5000  # kg
MAX_TEAM_SIZE = 50  # humans per cradle
RAMP_SLOPE_DEFAULT = 15  # degrees
CRADLE_WHEEL_SPEED = 0.5  # m/s
CRADLE_PAD_SPEED = 0.2  # m/s
MAINTENANCE_TIME_PER_WHEEL_SWAP = 5  # minutes
COUNTERWEIGHT_MAX = 2000  # kg
CRADLE_CAPACITY_BLOCKS = 1
CRADLE_CAPACITY_STATUES = 1

# ===============================================
# 3. Define Terrain Types
# ===============================================
TERRAINS = {
    "hard": {"friction": 0.3, "speed_factor": 1.0},
    "sand": {"friction": 0.6, "speed_factor": 0.5},
    "uneven": {"friction": 0.5, "speed_factor": 0.7}
}

# ===============================================
# 4. Define Cradle Class (All-Terrain)
# ===============================================
class Cradle:
    def __init__(self, item_type, weight, terrain="hard"):
        self.item_type = item_type  # "block" or "statue"
        self.weight = weight  # kg
        self.terrain = terrain
        self.wheels_on = True
        self.counterweight = min(weight * 0.4, COUNTERWEIGHT_MAX)  # balance approx 40%
        self.equilibrium = self.compute_equilibrium()
        self.position = 0  # meters along ramp
        self.speed = CRADLE_WHEEL_SPEED if self.wheels_on else CRADLE_PAD_SPEED
        self.maintenance_time = 0  # minutes invested

    def compute_equilibrium(self):
        # Simplified torque balance formula
        return self.counterweight / max(1, self.weight)  # 0–1, higher = more stable

    def switch_wheels(self):
        # Switch from wheels to pads or back
        self.wheels_on = not self.wheels_on
        self.speed = CRADLE_WHEEL_SPEED if self.wheels_on else CRADLE_PAD_SPEED
        self.maintenance_time += MAINTENANCE_TIME_PER_WHEEL_SWAP

    def move(self, distance):
        # Move cradle along terrain
        terrain_factor = TERRAINS[self.terrain]["speed_factor"]
        time_to_move = distance / (self.speed * terrain_factor)  # seconds
        self.position += distance
        return time_to_move / 60  # convert to minutes

# ===============================================
# 5. Define Pyramid Simulator
# ===============================================
class PyramidSimulator:
    def __init__(self, total_blocks, total_statues, num_cradles=5, ramp_slope=RAMP_SLOPE_DEFAULT):
        self.total_blocks = total_blocks
        self.total_statues = total_statues
        self.num_cradles = num_cradles
        self.ramp_slope = ramp_slope
        self.cradles = []
        self.time_elapsed = 0  # minutes

    def assign_cradles(self):
        # Initialize cradles with blocks or statues
        for _ in range(min(self.num_cradles, self.total_blocks)):
            self.cradles.append(Cradle("block", AVERAGE_BLOCK_WEIGHT))
        for _ in range(min(self.num_cradles, self.total_statues)):
            self.cradles.append(Cradle("statue", AVERAGE_STATUE_WEIGHT))

    def simulate_move(self, distance_per_cradle=500):
        # Run simulation for all cradles
        for cradle in self.cradles:
            move_time = cradle.move(distance_per_cradle)
            self.time_elapsed += move_time
            # Randomly switch wheels for terrain change
            if random.random() < 0.3:
                cradle.switch_wheels()
                self.time_elapsed += cradle.maintenance_time

    def run_simulation(self):
        print("Simulation started...")
        self.assign_cradles()
        steps = math.ceil(max(self.total_blocks, self.total_statues) / self.num_cradles)
        for step in range(steps):
            print(f"Step {step+1}/{steps}")
            self.simulate_move()
        print(f"Simulation complete. Total time: {self.time_elapsed/60:.2f} hours")

# ===============================================
# 6. Run Simulator Example
# ===============================================
if __name__ == "__main__":
    # Scenario: 2.3M pyramid blocks + 200 statues
    simulator = PyramidSimulator(total_blocks=2300000, total_statues=200, num_cradles=10)
    simulator.run_simulation()
