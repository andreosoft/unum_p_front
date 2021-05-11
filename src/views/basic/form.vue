<template>
  <a-dialog-form-from-model
    :show="show"
    :data="data"
    :model="model"
    :errors="errors"
    :title="data.id ? `${data.name} <small>(${data.id})</small>` : $t('New')"
    :loading="loading"
    @update-data="data = $event"
    @close-form="$emit('close-form', $event)"
    @validate="validate($event)"
  >
    <template v-slot:subscriptions>
      <small>*{{ $t("indicates required field") }}</small>
    </template>
    <template v-slot:actions>
      <a-btn-form-close @click="closeForm()" />
        <a-btn-form-save @click="submit()" />
    </template>
  </a-dialog-form-from-model>
</template>

<script>
import baseForm from "@/share/components/libs/baseForm";

export default {
  mixins: [baseForm],
};
</script>