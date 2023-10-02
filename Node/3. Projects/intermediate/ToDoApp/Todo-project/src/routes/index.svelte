<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    export const load: Load = async ({ fetch }) => {
      const res = await fetch("/todos.json");
      if (res.ok) {
        const todos = await res.json();
        return {
          props: { todos }
        }
      }
      const { message } = await res.json();
      return {
        error: new Error(message)
      }
    };
  </script>


<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte"
    export let todos: Todo[];
    const title ="Título da página"
</script>

<style>
.main-cont{
    width: 100%;
    max-width: 52rem;
    margin: 2rem auto 0 auto;
}

.native-form{
    margin: 0 0 .8rem 0;
}

.native-form input{
    font-size: 28px;
    width: 100%;
    padding: .5em  1em .3em 1em;
    box-sizing: border-box;
    text-align: center;
    background-color: #ECB365;
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.753);
    border-radius: 5px;
}

.native-form :global(input){
    border: 1px solid transparent;
}
.native-form :global(input:focus-visible){
    transition: all ease-in .30s;
    background-color:#b8ec65;
    border: 1px solid black !important;
    outline: none;
}

</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="main-cont">
    <h1>{title}</h1>
    <form action="/todos.json" method="post" class="native-form">
        <input type="text" name="tap-first-insert" aria-label="Add item" placeholder="tap do add a item">
    </form>
    {#each todos as todo}
        <TodoItem todo={todo}/>
    {/each}
</div>
