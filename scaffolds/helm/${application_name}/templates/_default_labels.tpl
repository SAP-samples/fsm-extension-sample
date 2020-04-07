{{/* Generate basic labels */}}
{{- define "default_labels" }}
app:  {{ template "chart.name" . }}
release: {{ .Release.Name }}
{{- end }}