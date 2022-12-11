<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <div class="row">
      <div class="col-md-12">
        <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/medicine">Medicamentos</RouterLink>
      </nav>
      </div>
    </div><br>
     <div>
      <RouterView />
    </div>
</template>

<style scoped>

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /* width: 100%; */
  width: 100%;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
  background-color: rgb(0, 146, 146);
}
/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  margin: 10px;
  font-size: 16px;
  color: whitesmoke;
  text-decoration: none;

}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    /* margin-left: -1rem; */
    /* font-size: 1rem; */

    /* padding: 1rem 0; */
    /* margin-top: 1rem;
  }
/* }  */
</style>
