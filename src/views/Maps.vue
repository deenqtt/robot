<template>
  <main id="maps">
    <div class="card-container">
      <div class="card">
        <div class="card-body">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.241698280586!2d106.73526995!3d-6.189527200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7122267c067%3A0x26e6e27ab6082c99!2sPT%20Kawan%20Lama%20Sejahtera!5e0!3m2!1sid!2sid!4v1703579817686!5m2!1sid!2sid"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          Add Target Robot

          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#Add"
          >
            Add
          </button>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">X Position (cm)</th>
                <th scope="col">Y Position (cm)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="robot in robots" :key="robot.id">
              <TargetRobotRow :robot="robot" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="Add"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!-- Modal -->

      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Mission</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              placeholder="Masalah Robot"
              class="form-control"
            />
            <br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-warning">Input</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script></script>

<style scoped>
.card-container {
  display: grid;
  gap: 20px;
}
.card {
  width: 650px;
}
</style>
