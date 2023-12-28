<template>
  <main id="new-page">
    <button class="btn btn-primary" @click="openModal">Add New Robot</button>

    <!-- Display entered robot data in a card -->
    <div class="card mt-4" v-if="robots.length > 0">
      <div class="card-header">
        <h5 class="card-title">Robot Details</h5>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Serial Number</th>
              <th>Description</th>
              <th>Image</th>
              <th>Active?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="robot in robots" :key="robot.id">
              <td>{{ robot.name }}</td>
              <td>{{ robot.type }}</td>
              <td>{{ robot.serialNumber }}</td>
              <td>{{ robot.description }}</td>
              <td v-if="robot.image">
                <img
                  :src="robot.image"
                  alt="Robot Image"
                  class="img-thumbnail"
                  style="max-width: 50px"
                />
              </td>
              <td v-else>No Image</td>
              <td>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="activeCheckbox"
                      v-model="robot.isActive"
                    />
                    <label class="form-check-label" for="activeCheckbox"
                      >Active</label
                    >
                  </div>
                </div>
              </td>
              <td>
                <button
                  class="btn btn-primary btn-sm"
                  @click="editRobot(robot)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- modal edit -->
    <div
      class="modal fade"
      id="editRobotModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editRobotModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRobotModalLabel">Edit Robot</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeEditModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Form for editing a robot -->
            <form @submit.prevent="updateRobot">
              <!-- ... (existing form fields) ... -->

              <!-- New field for specifying the robot's location -->
              <div class="form-group">
                <label for="editRobotLocation">Robot Location:</label>
                <leaflet-map
                  id="editRobotLocation"
                  :zoom="13"
                  :center="robot.location"
                  style="height: 200px"
                >
                  <leaflet-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  ></leaflet-tile-layer>
                  <leaflet-marker :lat-lng="robot.location"></leaflet-marker>
                </leaflet-map>
              </div>

              <!-- New field for specifying whether the robot is active or not -->
              <div class="form-group">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="editActiveCheckbox"
                    v-model="robot.isActive"
                  />
                  <label class="form-check-label" for="editActiveCheckbox"
                    >Active</label
                  >
                </div>
              </div>

              <!-- ... (existing form submit button) ... -->
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for Add New Robot -->
    <div
      class="modal fade"
      id="addRobotModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addRobotModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRobotModalLabel">Add New Robot</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Form for adding a new robot -->
            <form @submit.prevent="saveRobot">
              <div class="form-group">
                <label for="robotName">Robot Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="robotName"
                  v-model="robot.name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="robotType">Robot Type:</label>
                <select
                  class="form-control"
                  id="robotType"
                  v-model="robot.type"
                  required
                >
                  <option value="Industrial">Industrial</option>
                  <option value="Exploration">Exploration</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
              <div class="form-group">
                <label for="robotSerialNumber">Serial Number:</label>
                <input
                  type="text"
                  class="form-control"
                  id="robotSerialNumber"
                  v-model="robot.serialNumber"
                  required
                />
              </div>
              <div class="form-group">
                <label for="robotDescription">Description:</label>
                <textarea
                  class="form-control"
                  id="robotDescription"
                  v-model="robot.description"
                ></textarea>
              </div>
              <!-- Add more input fields as needed -->

              <div class="form-group">
                <label for="robotImage">Robot Image:</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="robotImage"
                  @change="handleImageUpload"
                />
                <img
                  v-if="robot.image"
                  :src="robot.image"
                  alt="Robot Image"
                  class="img-thumbnail mt-2"
                  style="max-width: 200px"
                />
              </div>

              <button type="submit" class="btn btn-primary">Save Robot</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      robot: {
        name: "",
        type: "Industrial",
        serialNumber: "",
        description: "",
        image: null,
        // Add more properties as needed
      },
      robots: [],
    };
  },
  mounted() {
    // Load robot data from local storage on component mount
    const storedRobots = localStorage.getItem("robots");
    if (storedRobots) {
      this.robots = JSON.parse(storedRobots);
    }
  },
  methods: {
    openModal() {
      $("#addRobotModal").modal("show");
    },
    closeModal() {
      $("#addRobotModal").modal("hide");
    },
    saveRobot() {
      // Handle saving the robot data here
      const newRobot = { ...this.robot, id: Date.now() };
      this.robots.push(newRobot);

      // Save the updated robot data to local storage
      localStorage.setItem("robots", JSON.stringify(this.robots));
      this.robotHistory.push({
        timestamp: Date.now(),
        action: `Robot added - ${newRobot.name}`, // Adjust this based on your robot data properties
      });
      this.robot = {
        // ... (reset robot data properties)
        location: [0, 0],
        isActive: true,
      };
      this.closeModal();
    },
    editRobot(robot) {
      // Set the robot data for editing
      this.robot = { ...robot };
      // Show the edit modal
      $("#editRobotModal").modal("show");
    },
    closeEditModal() {
      $("#editRobotModal").modal("hide");
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Use FileReader to convert the image to a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.robot.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
<style scoped>
.img-thumbnail {
  max-height: 50px;
}
/* Style for the button */
button.btn-primary {
  margin-bottom: 20px;
}

/* Style for the modal */
.modal-content {
  border-radius: 10px;
}

.modal-header {
  background-color: #007bff;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-title {
  font-weight: bold;
}

/* Style for the form */
form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}
.card-header {
  border-radius: 20px;
  margin: 10px;
}
/* Add more styles as needed */
</style>
