<template>
    <div id="app" class="min-h-screen flex flex-col bg-gray-100">
        <header class="bg-blue-600 text-white p-4 shadow-md">
            <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-3xl font-bold">Trivia Game</h1>
            </div>
        </header>
        <main class="flex-grow p-4 container mx-auto">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-semibold mb-4">Welcome to the Trivia Game!</h2>
                <p class="mb-4">Test your knowledge with our fun and challenging trivia questions.</p>
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Start Game</button>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
