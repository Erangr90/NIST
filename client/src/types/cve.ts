type descriptionType = {
  lang: string
  value: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type metricType = {
  cvssMetricV40?: any[]
  cvssMetricV31?: any[]
  cvssMetricV30?: any[]
  cvssMetricV2?: any[]
}

type weaknessType = {
  source: string
  type: string
  description: descriptionType[]
}

type cpeMatchType = {
  vulnerable: boolean
  criteria: string
  matchCriteriaId: string
  versionStartExcluding: string
  versionStartIncluding: string
  versionEndExcluding: string
  versionEndIncluding: string
}
type nodeType = {
  operator: string
  negate: boolean
  cpeMatch: cpeMatchType[]
}

type configType = {
  operator: string
  negate: boolean
  nodes: nodeType[]
}

type referenceType = {
  url: string
  source: string
  tags: string[]
}

type vendorCommentType = {
  organization: string
  comment: string
  lastModified: Date
}

type cveTagType = {
  sourceIdentifier: string
  tags: string[]
}

export type CVE = {
  cveId: string
  sourceIdentifier: string
  published: Date
  lastModified: Date
  vulnStatus: string
  descriptions: descriptionType[]
  metrics: metricType
  weaknesses: weaknessType[]
  configurations: configType[]
  references: referenceType[]
  vendorComments: vendorCommentType[]
  evaluatorComment: string
  evaluatorSolution: string
  evaluatorImpact: string
  cveTags: cveTagType[]
}
