gcloud container images delete gcr.io/${GOOGLE_CLOUD_PROJECT}/react-form:1.0.0 -q
dir=gs://${GOOGLE_CLOUD_PROJECT}_cloudbuild
gsutil rm -r $dir
dir=gs://artifacts.${GOOGLE_CLOUD_PROJECT}.appspot.com
gsutil rm -r $dir
gcloud run services delete react-form --platform managed --region=us-east1 -q