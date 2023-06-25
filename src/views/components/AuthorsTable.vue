<template>
  <div class="card col-8">
    <div class="card-header pb-0">
      <h6>Барааны жагсаалт</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Зураг</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Category</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Үнэ</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://scontent.fuln4-2.fna.fbcdn.net/v/t39.30808-6/321774396_6638395939510644_3481574014330865513_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=mcJ32Znp6IAAX-2Xlgg&_nc_ht=scontent.fuln4-2.fna&oh=00_AfD1PabEV1doSdd7qDgwbgtxPN2NXTMx25nyzhVhbeIMcw&oe=6458B187"
                      class="w-20"
                      alt="user1"
                    />
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">Даавуу</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-lg bg-gradient-success">40000</span>
              </td>
              <td class="align-middle">
                <a
                  href="../edit"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://scontent.fuln4-2.fna.fbcdn.net/v/t39.30808-6/321774396_6638395939510644_3481574014330865513_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=mcJ32Znp6IAAX-2Xlgg&_nc_ht=scontent.fuln4-2.fna&oh=00_AfD1PabEV1doSdd7qDgwbgtxPN2NXTMx25nyzhVhbeIMcw&oe=6458B187"
                      class="w-20"
                      alt="user2"
                    />
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Футболк</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-lg bg-gradient-secondary">25000</span>
              </td>
              <td class="align-middle">
                <a
                  href="../edit"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      src="https://scontent.fuln4-2.fna.fbcdn.net/v/t39.30808-6/321774396_6638395939510644_3481574014330865513_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=mcJ32Znp6IAAX-2Xlgg&_nc_ht=scontent.fuln4-2.fna&oh=00_AfD1PabEV1doSdd7qDgwbgtxPN2NXTMx25nyzhVhbeIMcw&oe=6458B187"
                      class="w-20"
                      alt="user3"
                    />
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Футболк</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-lg bg-gradient-secondary">25000</span>
              </td>
              <td class="align-middle">
                <a
                  href="../edit"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "authors-table",
};
</script>
