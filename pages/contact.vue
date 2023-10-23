<script setup>
definePageMeta({
  layout: "with-page-title",
});

useHead({
  title: "Contact Us",
});

const contactRequest = useContactRequest();

const form = reactive({
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
});

const contactForm = ref();
const loading = ref(false);

const submitContactForm = async () => {
  loading.value = true;
  const { valid } = await contactForm.value.validate();

  if (valid) {
    contactRequest.create(form, contactForm);
  }
  loading.value = false;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card border class="mt-n16" style="position: sticky; top: 100px">
          <v-card-text class="text-h5 font-weight-bold pt-8">
            Contact Us for any queries
          </v-card-text>
          <v-form ref="contactForm" @submit.prevent="submitContactForm">
            <v-card-text class="pb-0">
              <v-text-field
                v-model="form.name"
                flat
                density="compact"
                variant="solo-filled"
                placeholder="Full Name"
                :loading="loading"
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
                flat
                density="compact"
                variant="solo-filled"
                placeholder="Phone Number"
                :loading="loading"
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                flat
                density="compact"
                variant="solo-filled"
                placeholder="Email Address"
                :loading="loading"
                :disabled="loading"
              ></v-text-field>
              <v-text-field
                v-model="form.subject"
                flat
                density="compact"
                variant="solo-filled"
                placeholder="Subject"
                :loading="loading"
                :disabled="loading"
              ></v-text-field>
              <v-textarea
                v-model="form.message"
                flat
                density="compact"
                variant="solo-filled"
                placeholder="Message"
                :loading="loading"
                :disabled="loading"
              ></v-textarea>
            </v-card-text>
            <v-btn
              block
              type="submit"
              rounded="0"
              height="50"
              class="text-capitalize"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <div class="text-h2 my-10 font-weight-bold">
          Excited about the event?<br />
          Please get in touch.
        </div>

        <v-row>
          <v-col cols="12" md="6" v-for="i in 3">
            <v-card rounded="lg">
              <v-card-title>{{ i }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.773511948522!2d85.29615404877931!3d27.68814486024849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e60ae8656b%3A0xd8715f2ae901608!2sSagarmatha%20Engineering%20College!5e0!3m2!1sen!2snp!4v1697282372966!5m2!1sen!2snp"
                width="100%"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
