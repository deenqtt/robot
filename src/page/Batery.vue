<template>
  <main id="battery-page">
    <div class="row">
      <router-link to="/settings">
        <button class="btn btn-info">Back</button>
      </router-link>
      <div class="battery-card">
        <div class="card-header bg-primary">
          <h3 class="text-white text-center">Battery Level</h3>
        </div>
        <div class="card-body">
          <span class="material-symbols-outlined ev-icon">
            battery_charging_90
          </span>
          <div class="battery-container">
            <div class="battery-wrapper">
              <div
                class="battery-level"
                :style="{ width: batteryPercentage + '%' }"
              ></div>
            </div>
            <div class="battery-text">{{ batteryPercentage }}%</div>
          </div>
        </div>
      </div>
      <div class="charging-status-card">
        <div class="card-header">
          <h3>Charging Status</h3>
        </div>
        <div class="card-body">
          <div class="charging-info">
            <span class="status-label">Charging:</span>
            <span class="status-value"> {{ isCharging ? "Yes" : "No" }}</span>
          </div>
        </div>
      </div>
      <div class="battery-remaining-time-card">
        <div class="card-header">
          <h3>Remaining Time</h3>
        </div>
        <div class="card-body">
          <div class="remaining-time-info">
            <span class="time-label">Estimated Remaining Time:</span>
            <span class="time-value">{{ remainingTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="battery-history-card">
        <div class="card-header">
          <h3>Battery Usage History</h3>
        </div>
        <div class="card-body">
          <canvas ref="batteryChart"></canvas>
        </div>
      </div>
      <div class="low-battery-notification-card">
        <div class="card-header">
          <h3>Low Battery Notification</h3>
        </div>
        <div class="card-body">
          <button @click="simulateLowBattery">Simulate Low Battery</button>
        </div>
      </div>
      <div class="battery-options-card">
        <div class="card-header">
          <h3>Battery Options</h3>
        </div>
        <div class="card-body">
          <button @click="openBatterySettings">Open Battery Settings</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="battery-info-card">
        <div class="card-header">
          <h3>Battery Information</h3>
        </div>
        <div class="card-body">
          <div class="battery-status">
            <span class="material-icons battery-icon">battery_full</span>
            <span class="battery-percentage">{{ batteryPercentage }}%</span>
          </div>
          <div class="technical-info">
            <p>Type: Lithium-ion</p>
            <p>Voltage: 12V</p>
            <p>Capacity: 5000 mAh</p>
            <p>Charging Time: 3 hours</p>
            <!-- Add more technical information as needed -->
          </div>
        </div>
      </div>
      <div class="battery-history-chart">
        <div class="card-header">
          <h3>Battery History Chart</h3>
        </div>
        <div class="card-body">
          <canvas ref="batteryHistoryChart"></canvas>
        </div>
      </div>
      <div class="emergency-actions">
        <div class="card">
          <div class="card-header">
            <h3>Emergency Actions</h3>
          </div>
          <div class="card-body">
            <p>
              In case of emergency or low battery situation, please follow these
              steps:
            </p>
            <ol>
              <li>Connect the robot to a power source immediately.</li>
              <li>
                Check the charging cable and power adapter for any issues.
              </li>
              <li>Contact technical support for further assistance.</li>
            </ol>
            <button @click="callEmergencyHotline">
              Call Emergency Hotline
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script scoped>
import Chart from "chart.js/auto";
import dayjs from "dayjs"; // Import dayjs untuk adapter tanggal

export default {
  data() {
    return {
      batteryPercentage: 50,
      batteryHistory1: [80, 70, 65, 50, 45, 40, 30],
      isCharging: false,
      remainingTime: "2 hours",
      batteryHistory: [
        { timestamp: "2023-01-01T08:00:00", percentage: 80 },
        { timestamp: "2023-01-02T08:00:00", percentage: 70 },
        { timestamp: "2023-01-03T08:00:00", percentage: 65 },
        { timestamp: "2023-01-04T08:00:00", percentage: 50 },
        { timestamp: "2023-01-05T08:00:00", percentage: 45 },
        { timestamp: "2023-01-06T08:00:00", percentage: 40 },
        { timestamp: "2023-01-07T08:00:00", percentage: 30 },
        // Add more data points as needed
      ],
    };
  },
  mounted() {
    this.setupDateAdapter(); // Inisialisasi adapter tanggal
    this.renderChart();
    this.renderBatteryHistoryChart();
  },
  methods: {
    setupDateAdapter() {
      Chart.register({
        id: "dayjs",
        // Atur adapter tanggal di level aplikasi
        formatters: {
          datetime: (millis) => dayjs(millis).format("YYYY-MM-DDTHH:mm:ss"),
        },
        add: (timestamp, amount, unit) =>
          dayjs(timestamp).add(amount, unit).valueOf(),
        startOf: (timestamp, unit) => dayjs(timestamp).startOf(unit).valueOf(),
        endOf: (timestamp, unit) => dayjs(timestamp).endOf(unit).valueOf(),
      });
    },
    renderBatteryHistoryChart() {
      const ctx = this.$refs.batteryHistoryChart.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.batteryHistory.map((data) => data.timestamp),
          datasets: [
            {
              label: "Battery Level",
              data: this.batteryHistory.map((data) => data.percentage),
              borderColor: "#007bff",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "time",
              position: "bottom",
              time: {
                unit: "day",
              },
            },
            y: {
              min: 0,
              max: 100,
            },
          },
        },
      });
    },
    renderChart() {
      const ctx = this.$refs.batteryChart.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.generateLabels(),
          datasets: [
            {
              label: "Battery Usage",
              data: this.batteryHistory1, // Ganti dengan properti yang sesuai
              borderColor: "#007bff",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              min: 0,
            },
            y: {
              min: 0,
              max: 100,
            },
          },
        },
      });
    },
    generateLabels() {
      // Generate labels for the chart (e.g., timestamps or indices)
      return Array.from(
        { length: this.batteryHistory1.length },
        (_, i) => i + 1
      );
    },
    simulateLowBattery() {
      const lowBatteryThreshold = 20;
      const currentBatteryLevel = 18;

      if (currentBatteryLevel <= lowBatteryThreshold) {
        this.showLowBatteryNotification();
      }
    },
    showLowBatteryNotification() {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Low Battery Warning", {
              body: "Battery level is low. cAS gOBLOK.",
              icon: "path/to/your/icon.png",
            });
          }
        });
      } else {
        console.error("Browser does not support notifications");
      }
    },
    openBatterySettings() {
      console.log("Opening battery settings...");
    },
    callEmergencyHotline() {
      console.log("Calling emergency hotline...");
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px;
  background-color: #dc3545; /* Sesuaikan warna tombol */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.emergency-actions {
  width: 300px; /* Sesuaikan lebar card */
  margin-top: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.battery-history-chart {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
}
.battery-info-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
}
.battery-status {
  display: flex;
  align-items: center;
}

.battery-icon {
  font-size: 48px; /* Sesuaikan ukuran ikona baterai */

  color: #4caf50; /* Sesuaikan warna ikona baterai sesuai tingkat persentase */
}

.battery-percentage {
  font-size: 24px; /* Sesuaikan ukuran teks persentase baterai */
  color: #4caf50; /* Sesuaikan warna teks persentase baterai sesuai tingkat persentase */
}

.technical-info {
  margin-top: 20px;
}

.technical-info p {
  margin: 0;
}
.battery-options-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  margin: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
}
.low-battery-notification-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
}
.battery-history-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
  padding: 10px;
}

.battery-remaining-time-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
}
.remaining-time-info {
  display: flex;
  justify-content: space-between;
}

.time-label {
  font-weight: bold;
}

.time-value {
  color: #4caf50; /* Sesuaikan warna teks estimasi waktu sisa */
}
.charging-status-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
}

.card-header {
  background-color: #007bff; /* Sesuaikan warna header card */
  color: #fff;
  padding: 10px;
}

.card-body {
  padding: 20px;
}

.charging-info {
  display: flex;
  justify-content: space-between;
}

.status-label {
  font-weight: bold;
}

.status-value {
  color: #4caf50; /* Sesuaikan warna teks status pengisian */
}
.battery-card {
  width: 300px; /* Sesuaikan lebar card */
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
}

.card-body {
  padding: 20px;
  transition: background-color 0.3s ease;
}

.battery-container {
  display: flex;
  align-items: center;
  font-family: "Arial", sans-serif;
}

.battery-wrapper {
  position: relative;
  width: 100px; /* Sesuaikan ukuran baterai */
  height: 40px; /* Sesuaikan ukuran baterai */
  background-color: #ddd;
  border-radius: 5px;
}

.battery-level {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #4caf50; /* Sesuaikan warna baterai sesuai tingkat persentase */
  border-radius: 5px;
  transition: width 0.5s ease; /* Efek animasi ketika persentase berubah */
}

.battery-text {
  margin-left: 10px; /* Jarak antara baterai dan teks persentase */
  font-size: 18px; /* Sesuaikan ukuran teks persentase */
}
.ev-icon {
  font-size: 100px; /* Adjust the font size based on your design */
  transition: color 0.3s ease; /* Add transition for color change */
}

.ev-icon:hover {
  color: #16e107; /* Green color on hover */
}
</style>
