<template>
  <main id="task-page">
    <div class="container">
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#AddNewModal"
      >
        Add
      </button>
      <br />
      <br />
      <div class="card">
        <h5 class="card-header">Tasks List For Robot 1</h5>

        <div class="card-body">
          <table class="table table-striped" id="tasksTable">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Task Name</th>
                <th scope="col">Due Date & Time</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <!-- {{ tasks }} -->
              <tr>
                <th scope="col">21302</th>
                <th scope="col">Going To Warehouse</th>
                <td>2021/8/7, 14:30:00</td>
                <td>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#detailModal"
                    class="btn btn-info"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Button trigger modal -->
          <!-- Modal -->
          <div
            class="modal fade"
            id="AddNewModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="
    AddNewLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="AddNewLabel">
                    Add New Task for...
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form @submit.prevent="addTask">
                  <div class="modal-body">
                    <div class="row justify-content-center mt-3">
                      <select class="form-control">
                        <option value="Select">Select robot</option>
                        <option value="Robot1">Robot1</option>
                      </select>
                    </div>
                    <div class="row justify-content-center mt-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        class="form-control"
                      />
                    </div>
                    <div class="row justify-content-center mt-2">
                      <input
                        type="datetime-local"
                        name="duetime"
                        required
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <input
                      type="submit"
                      value="Save Task"
                      class="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
          <div
            class="status-indicator"
            :class="{
              'in-progress': isTaskInProgress,
              completed: isTaskCompleted,
            }"
          >
            {{ statusText }}
          </div>
        </div>
      </div>
      <div class="card">
        <h5 class="card-header">Tasks List For Robot 2</h5>

        <div class="card-body">
          <table class="table table-striped" id="tasksTable">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Task Name</th>
                <th scope="col">Due Date & Time</th>
                <th scope="col"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- {{ tasks }} -->
              <tr>
                <th scope="col">213043</th>
                <th scope="col">Going To</th>
                <td>2021/8/7, 14:30:00</td>
                <td>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#detailModal"
                    class="btn btn-info"
                  >
                    Detail
                  </button>
                </td>
                <td><button class="btn btn-success">Start</button></td>
              </tr>
            </tbody>
          </table>
          <div>
            <!-- Task List -->
            <ul class="task-list">
              <li v-for="(task, index) in tasks" :key="index">
                <span class="task-name">{{ task.name }}</span>
                <button
                  class="control-button"
                  :class="{ disabled: task.status === 'In Progress' }"
                >
                  Start
                </button>
                <button
                  class="control-button"
                  :class="{ disabled: task.status === 'Completed' }"
                >
                  Stop
                </button>
                <button class="control-button" @click="deleteTask(index)">
                  Delete
                </button>
              </li>
            </ul>

            <!-- Button to Shuffle Task Order -->
            <button class="shuffle-button" @click="shuffleTasks">
              Shuffle Task Order
            </button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
          <div
            class="status-indicator"
            :class="{
              'in-progress': isTaskInProgress,
              completed: isTaskCompleted,
            }"
          >
            {{ statusText }}
          </div>
        </div>
      </div>
    </div>
    <!-- modal detail task -->
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="
    AddNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskDetailTitle"></h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <p>
              <b>Task: Goin To Warehouse </b><span id="taskDetailName"></span>
            </p>
            <hr />
            <p><b>Due Time: </b><span id="taskDetailTime"></span></p>
            <br />
            <a
              ><button class="btn btn btn-outline-success my-2">Done</button></a
            >
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
      tasks: [
        { name: "Task 1", status: "In Progress" },
        { name: "Task 2", status: "Completed" },
        // Add more tasks as needed
      ],
      searchTerm: "",
      selectedFilter: "all",
    };
  },
  computed: {
    filteredTasks() {
      // Apply search and filter logic here
      return this.tasks.filter((task) => {
        const includesSearchTerm = task.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        const matchesFilter =
          this.selectedFilter === "all" ||
          task.status.toLowerCase() === this.selectedFilter.toLowerCase();
        return includesSearchTerm && matchesFilter;
      });
    },
  },
  watch: {
    filteredTasks() {
      // Update the map visualization here if needed
      this.updateMap();
    },
  },
  methods: {
    updateMap() {
      // Add your Leaflet map update logic here
    },
  },
  mounted() {
    // Initialize the map here using Leaflet library
    // Example: L.map('map').setView([51.505, -0.09], 13);
  },

  data() {
    return {
      totalTasks: 10, // Total number of tasks
      completedTasks: 5, // Number of completed tasks
    };
  },
  computed: {
    progress() {
      return (this.completedTasks / this.totalTasks) * 100;
    },
    isTaskInProgress() {
      return this.completedTasks < this.totalTasks;
    },
    isTaskCompleted() {
      return this.completedTasks === this.totalTasks;
    },
    statusText() {
      return this.isTaskInProgress ? "In Progress" : "Completed";
    },
  },
};
</script>
<style scoped>
/* Style for the progress bar */

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.task-name {
  flex-grow: 1;
  margin-right: 10px;
}

.control-button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.control-button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.shuffle-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
.progress-container {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #007bff; /* Adjust the color based on your design */
}

/* Style for the status indicator */
.status-indicator {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.in-progress {
  color: #007bff; /* Color for in-progress status */
}

.completed {
  color: #28a745; /* Color for completed status */
}
.card {
  margin-top: 10px;
}
</style>
