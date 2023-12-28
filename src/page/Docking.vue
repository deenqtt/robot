<template>
  <main id="docking-page">
    <div class="row">
      <!-- Panduan Penggunaan -->
      <div class="user-guide">
        <h2>Panduan Penggunaan</h2>
        <p>
          1. Tempatkan robot di tempat yang benar di depan stasiun pengisian.
        </p>
        <p>
          2. Pastikan koneksi pengisian stabil sebelum memulai proses pengisian.
        </p>
        <!-- Add more user guide steps as needed -->
      </div>

      <!-- Keamanan -->
      <div class="security">
        <h2>Keamanan</h2>
        <p>
          Pastikan untuk mengunci stasiun pengisian ketika tidak digunakan untuk
          mencegah akses yang tidak sah.
        </p>
        <!-- Add more security information as needed -->
      </div>
    </div>
    <div class="row">
      <div class="charging-card">
        <h2>Status Pengisian Baterai</h2>
        <div class="battery-level">
          <p>Tingkat Baterai:</p>
          <div class="battery-indicator-container">
            <div
              class="battery-indicator"
              :style="{ width: batteryWidth }"
            ></div>
          </div>
        </div>
        <div class="status-docking">
          <p>Status Docking:</p>
          <img :src="dockingStatusIcon" alt="Docking Status" />
          <p>{{ dockingStatus }}</p>
        </div>
        <div class="charging-time">
          <p>Waktu Pengisian:</p>
          <p>{{ chargingTimeInfo }}</p>
        </div>
      </div>
      <!-- Card untuk Riwayat Pengisian Baterai -->
      <div class="charging-history-card">
        <h2>Riwayat Pengisian Baterai</h2>
        <ul>
          <li v-for="history in chargingHistory" :key="history.id">
            <p>{{ history.date }} - {{ history.duration }}</p>
          </li>
        </ul>
      </div>
      <div class="notification-card">
        <h2>Pemberitahuan dan Notifikasi</h2>
        <p>{{ notificationMessage }}</p>
      </div>
    </div>
    <div class="row">
      <div class="remote-control">
        <h2>Remote Control</h2>
        <button @click="startCharging" :disabled="isDocked || isCharging">
          Mulai Pengisian
        </button>
        <button @click="stopCharging" :disabled="!isCharging">
          Hentikan Pengisian
        </button>
      </div>
    </div>
    <div class="row">
      <div class="technical-info">
        <h2>Informasi Teknis</h2>
        <p>Tegangan Baterai: {{ batteryVoltage }} Volt</p>
        <p>Arus Pengisian: {{ chargingCurrent }} Ampere</p>
        <!-- Add more technical parameters as needed -->
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      batteryWidth: "70%", // Example width for the battery indicator
      isDocked: true,
      isCharging: false,
      chargingStartTime: null,
      chargingHistory: [
        { id: 1, date: "2023-01-01", duration: "2 jam 30 menit" },
        { id: 2, date: "2023-01-02", duration: "1 jam 45 menit" },
        // Add more historical data as needed
      ],
      hasChargingIssue: false,
      batteryVoltage: 48.5, // Example value for battery voltage
      chargingCurrent: 10.0, // Example value for charging current
    };
  },
  computed: {
    dockingStatus() {
      return this.isDocked ? "Ter-dock" : "Belum Ter-dock";
    },
    dockingStatusIcon() {
      return this.isDocked
        ? "https://example.com/docked-icon.png"
        : "https://example.com/undocked-icon.png";
      // Replace the URLs with actual image URLs from the web
    },
    chargingTimeInfo() {
      if (this.chargingStartTime) {
        const currentTime = new Date();
        const elapsedTime = currentTime - this.chargingStartTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        return `${hours} jam ${minutes} menit`;
      } else {
        return "Belum mulai pengisian";
      }
    },
    notificationMessage() {
      return this.hasChargingIssue
        ? "Ada masalah dengan proses pengisian atau robot keluar dari docking tanpa selesai diisi baterainya."
        : "Semua sistem berjalan dengan baik.";
    },
  },
  methods: {
    startCharging() {
      if (this.isDocked && !this.isCharging) {
        this.isCharging = true;
        this.chargingStartTime = new Date();
        // Additional logic for starting the charging process
      }
    },
    stopCharging() {
      if (this.isCharging) {
        this.isCharging = false;
        // Additional logic for stopping the charging process
        // You may want to update the charging history here
        const chargingDuration = this.calculateChargingDuration();
        this.chargingHistory.push({
          id: this.chargingHistory.length + 1,
          date: new Date().toISOString().slice(0, 10),
          duration: chargingDuration,
        });
      }
    },
    calculateChargingDuration() {
      if (this.chargingStartTime) {
        const currentTime = new Date();
        const elapsedTime = currentTime - this.chargingStartTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        return `${hours} jam ${minutes} menit`;
      } else {
        return "0 jam 0 menit";
      }
    },
  },
};
</script>
<style scoped>
.user-guide {
  background-color: #fff;
  border-radius: 20px 50px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 8px rgba(17, 39, 182, 0.716);
}

.user-guide h2 {
  color: #2196f3; /* Blue color */
  font-family: "Poppins", sans-serif;
}

/* Styles for Keamanan */
.security {
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 1px 1px 8px rgba(197, 22, 22, 0.782);
  padding: 20px;
  margin-bottom: 20px;
}

.security h2 {
  color: #ff5722; /* Orange color */
}

/* Styles for Visualisasi Ruang */
.space-visualization {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.space-visualization h2 {
  color: #4caf50; /* Green color */
}

.technical-info {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 300px;
}

.technical-info p {
  margin: 10px 0;
}
.remote-control {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  width: 700px;
}

.remote-control button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.remote-control button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.notification-card {
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 8px rgba(219, 44, 44, 0.723);
  padding: 20px;
  text-align: center;
  margin-left: 20px;
}

.notification-card h2 {
  color: #f44336; /* Red color */
}
.charging-history-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 8px rgba(53, 201, 100, 0.7);
  padding: 20px;
  text-align: center;
  margin-left: 30px;
  width: 400px;
}

.charging-history-card ul {
  list-style-type: none;
  padding: 0;
}

.charging-history-card li {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.charging-history-card h2 {
  color: #4caf50; /* Green color */
}
.charging-card {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.battery-level {
  margin: 15px 0;
}

.battery-indicator-container {
  width: 100px;
  height: 30px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.battery-indicator {
  height: 100%;
  background-color: #4caf50; /* green color */
  border-radius: 5px;
  transition: width 0.5s ease;
}
.status-docking {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-docking,
.charging-time {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-docking img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
