{{/* Generate basic metadata */}}
{{- define "default_metadata" }}
name: {{ template "chart.name" . }}
labels:
  app: {{ template "chart.name" . }}
  chart: {{ template "chart.name" . }}-{{ .Chart.Version }}
  release: {{ .Release.Name }}
  heritage: {{ .Release.Service }}
  version: {{ .Chart.Version }}
{{- end }}