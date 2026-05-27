<script setup lang="ts">
// import { Icon } from '@iconify/vue'

const _emit = defineEmits<{
  addAnimalModal: [modalOpen: boolean]
}>()

function openAddAnimalModal(){
  _emit('addAnimalModal', true)
}

</script>
<template>
    <div >
  <div class="flex gap-5" >
    <h1 class="flex-4 text-2xl" >Zwierzaki w bazie</h1>
    <input type="text"  placeholder="Wyszukaj..." class="input input-bordered flex-4" />
    <button @click="openAddAnimalModal" class="btn btn-primary flex-1" >Dodaj</button>
  </div>
  <div >
    
    <div class="flex gap-4" >
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Gatunek</legend>
            <details className="dropdown">
                <summary className="m-1">Wszystkie gatunki</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Kot</a></li>
                    <li><a>Pies</a></li>
                </ul>
                </details>
         </fieldset>
         <fieldset className="fieldset">
                <legend className="fieldset-legend">Płeć</legend>
            <details className="dropdown">
                <summary className="m-1">Wszystkie płcie</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Samica</a></li>
                    <li><a>Samiec</a></li>
                </ul>
                </details>
         </fieldset>

    </div>

    <div class="dropdown dropdown-end">
      <!-- <div tabIndex="0" role="button" class="btn btn-ghost">
        <Icon icon="flowbite:adjustments-horizontal-outline" width="24" height="24" />
      </div>
      <ul
        tabIndex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul> -->
    </div>
 
</div>
    </div>
</template>
