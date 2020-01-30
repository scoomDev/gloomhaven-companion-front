<template>
    <div class="information">

    </div>
</template>

<style lang="scss">
    .information {
        position: absolute;
        top: 5px;
        left: 5px;
        display: flex;
        flex-direction: column;
        width: calc(100% - 10px);
        height: calc(100vh - 10px);
        background-color: $col_white;
        box-shadow: $shadow_material;
        z-index: $zindex_overall;
    }
</style>