<template>
	<main id="about-page">
		<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#report" >
			Report</button>
		<br>
		<br>
		<div class="card-container">
		<div class="card w-50">
			<div class="card-header">
				Report
				</div>
				<div class="card-body">
					<table class="table table-hover">
						<thead>
						  <tr>
							<th scope="col">#</th>
							<th scope="col">Robot</th>
							<th scope="col">Last</th>
							<th scope="col">Handle</th>
						  </tr>
						</thead>
						<tbody>
						  <tr>
							<th scope="row">1</th>
							<td>Mrk</td>
							<td>Oto</td>
							<td>mdo</td>
						  </tr>
						  <tr>
							<th scope="row">2</th>
							<td>Jaob</td>
							<td>Trnton</td>
							<td>at</td>
						  </tr>
						  <tr>
							<th scope="row">3</th>
							<td colspan="2">Lar</td>
							<td>witter</td>
						  </tr>
						</tbody>
					  </table>
				</div>
		</div>
		<br>
		<div class="card ">
			<div class="card-header">
				Robot Fix
			</div>
			<form @submit.prevent="addReport()">
				<div class="card-body">
					<label for="robotSelect">Choose Robot:</label><br>
					<select v-model="selectedRobot" id="robotSelect" name="robotSelect" class="form-control" required>
						<option disabled value="">Please select one robot.</option>
					</select><br>
					<button type="button" class="btn btn-primary mt-2" @click="loadOptions()">Load
						options</button>
						<small class="text-muted">If you don't see your robot, click the button above to load options
							from server.</small><br><br>
							<label for="lastField">Last report date</label>
							<input class="form-control" type="datetime-local" id="lastField" name="lastField" v-model="reportDate"><br>
							<label for="handleField">Handle by</label><br>
							<input class="form-control" type="text" id="handleField" name="handleField" placeholder="Enter name"
							v-model="handleInput" required><br>
							<input type="date" id="lastField" v-model="reportDate" class="form-control
							mb-2"><br>
							<button type="submit" class="btn btn-success">Submit</button>
				</div>
			</form>

		</div>
		<div class="card">
			<!-- tabel robot fix -->
			<div class="card-header">
				Fix Report Lists
			</div>
			<div class="card-body">
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name of Robot</th>
							<th scope="col">Handled By</th>
							<th scope="col">Time Handled On</th>
							<th scope="col"></th>

						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in reports" :key="index">
							<td scope="row">{{ item.id }}</td>
							<td>{{ item.name_of_robot }} (Serial Number: {{ item.serial_number
								}})
								</td>
								<td>{{ item.handled_by }} </td>
								<td>{{ new Date(item.time_handled).toLocaleString('en-US')}}	
									</td>
									<td scope="row">
										<a href="#" class="btn btn-warning" data-toggle="modal"
										data-target="#editModal" @click="setValuesForEditing(index)">Edit
										Report</a>
										<a href="#" class="btn btn-danger" @click="deleteItem(index
										)" >Delete Report</a>
										</td>			
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="modal fade" id="report" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<!-- Modal -->

	<div class="modal-dialog" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="exampleModalLabel">Tambah Report</h5>

		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="modal-body">
			<input type="text" placeholder="Masalah Robot" class="form-control">
			<br>
			<select class="form-control">
				<option value="Robot 1">Robot1</option>
				<option value="Robot 2">Robot3</option>
				<option value="Robot 3">Robot2</option>
			</select>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  <button type="button" class="btn btn-warning">Input</button>
		</div>
	  </div>
	</div>
  </div>
		</div>
	</main>
</template>
<script>
</script>

<style scoped>
.card-container {
   display: inline-flex;
	justify-content: space-between; /* Menempatkan kartu bersebelahan dengan jarak di antara mereka */
  }
  .card{
	padding-left: 16px;
	border: 1px solid #ccc;
	margin-left: 20px;
	width: 500;
  }
</style>