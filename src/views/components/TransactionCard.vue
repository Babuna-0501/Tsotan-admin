<template>
  <div class="card h-100 mb-4">
    <div class="card-header pb-0 px-3">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Захиалгын түүх</h6>
        </div>
      </div>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">Netflix</h6>
              <span class="text-xs">27 March 2020, at 12:30 PM</span>
            </div>
          </div>
        </li>
        <li
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">Apple</h6>
              <span class="text-xs">27 March 2020, at 04:30 AM</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="list-group">
        <li
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">Stripe</h6>
              <span class="text-xs">26 March 2020, at 13:45 PM</span>
            </div>
          </div>
        </li>
        <li
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">HubSpot</h6>
              <span class="text-xs">26 March 2020, at 12:30 PM</span>
            </div>
          </div>
        </li>
        <li
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">Creative Tim</h6>
              <span class="text-xs">26 March 2020, at 08:30 AM</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "transaction-card",
  components: {
    ArgonButton,
  },
};
</script>
