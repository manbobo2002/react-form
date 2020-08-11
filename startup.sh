gcloud services enable cloudbuild.googleapis.com

gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/react-form:1.0.0 .

gcloud run deploy react-form --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/react-form:1.0.0 --platform managed --region=us-east1 --allow-unauthenticated -q
