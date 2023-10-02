<script lang="ts">
    export let todo: Todo;
</script>

<style>
    .list-item{
        display: grid;
        grid-template-columns: 2rem 1fr 2rem;
        gap: .5rem;
        align-items: center;
        margin: 0 0 .5rem 0;
        padding: .5rem;
        background-color: white;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
        border-radius: 5px;
        transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
    }

    .list-item button{
        width: 2rem;
        height: 2rem;
        border: none;
        background-color: transparent;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .list-item input{
        flex: 1;
        padding: .5em 2em .5em 0.8em;
        border-radius: 5px;
    }

    button.status{
        border: 1px solid rgba(0, 0, 0, 0.753);
        box-sizing: border-box;
        border-radius: 50%;
        background-size: 1em auto;
    }

    .text-section{
        display: flex;
        position: relative;
        flex: 1;
        align-items: center;
    }


    .save-button{
        position: absolute;
        margin: 4px;
        padding: 4px;
        right: 0;
        opacity: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A");
    }
    
    .text-space:focus-visible{
        border: none;
        background-color: whitesmoke;
        outline: none;
    }

    .list-item input:focus + .save-button, .save-button:focus{
        transition: opacity 0.9s;
        opacity: .55;
    }

    .delete-button{
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		opacity: 0.2;
    }

    .delete-button:hover, .delete-button:focus{
        transition: all ease-in 0.2s;
        opacity: .5;
    }

  .finished {
    opacity: 0.4;
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
  }
  
  .finished .status {
    background-color: black;
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

</style>

<div class="list-item" class:finished={todo.done}>
    <form action="/todos/{todo.uid}.json?_method=patch" method="post">
        <input type="hidden" name="check-state" value="{todo.done ? '' : true}">
        <button aria-label="check todo as todo.done ? 'On progress' : 'Finished' " class="status"></button>
    </form>

    <form action="/todos/{todo.uid}.json?_method=patch" method="post" class="text-section">
        <input  class="text-space" name="content" type="text" style="border: none;" value="{todo.content}"/>
        <button aria-label="save item" class="save-button"></button>
    </form>

    <form action="/todos/{todo.uid}.json?_method=delete" method="post">
        <button aria-label="delete item" class="delete-button"></button>
    </form>
</div>