<template>
<v-container>
    <template>
        <v-card id="title"></v-card>
    </template>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Kí hiệu SQL" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
    <v-text-field v-model="date" label="Thông số" prepend-icon="event" readonly v-on="on"></v-text-field>
</v-container>
</template>

<script>
export default {
    name: 'DeviceSetting',

    data: () => ({
        label: {

        }
    }),
};
</script>
