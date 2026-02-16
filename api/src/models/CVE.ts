import mongoose, { Schema } from "mongoose"

const descriptionSchema = new Schema({
  lang: { type: String },
  value: { type: String },
})

const metricSchema = new Schema({
  cvssMetricV40: [{ type: Schema.Types.Mixed }],
  cvssMetricV31: [{ type: Schema.Types.Mixed }],
  cvssMetricV30: [{ type: Schema.Types.Mixed }],
  cvssMetricV2: [{ type: Schema.Types.Mixed }],
})

const weaknessSchema = new Schema({
  source: { type: String },
  type: { type: String },
  description: [descriptionSchema],
})

const cpeMatchSchema = new Schema({
  vulnerable: { type: Boolean },
  criteria: { type: String },
  matchCriteriaId: { type: String },
  versionStartExcluding: { type: String },
  versionStartIncluding: { type: String },
  versionEndExcluding: { type: String },
  versionEndIncluding: { type: String },
})
const nodeSchema = new Schema({
  operator: { type: String },
  negate: { type: Boolean },
  cpeMatch: [cpeMatchSchema],
})

const configSchema = new Schema({
  operator: { type: String },
  negate: { type: Boolean },
  nodes: [nodeSchema],
})

const referenceSchema = new Schema({
  url: { type: String },
  source: { type: String },
  tags: [{ type: String }],
})

const vendorCommentSchema = new Schema({
  organization: { type: String },
  comment: { type: String },
  lastModified: { type: Date },
})

const cveTagSchema = new Schema({
  sourceIdentifier: { type: String },
  tags: [{ type: String }],
})

const CVESchema = new Schema(
  {
    cveId: { type: String },
    sourceIdentifier: { type: String },
    published: { type: Date },
    lastModified: { type: Date },
    vulnStatus: { type: String },
    descriptions: [descriptionSchema],
    metrics: metricSchema,
    weaknesses: [weaknessSchema],
    configurations: [configSchema],
    references: [referenceSchema],
    vendorComments: [vendorCommentSchema],
    evaluatorComment: { type: String },
    evaluatorSolution: { type: String },
    evaluatorImpact: { type: String },
    cveTags: [cveTagSchema],
  },
  {
    timestamps: true,
  },
)
CVESchema.index({ cveId: 1 }, { unique: true })
CVESchema.index({ sourceIdentifier: 1 })
CVESchema.index({ published: 1 })
CVESchema.index({ lastModified: 1 })
CVESchema.index({ vulnStatus: 1 })
CVESchema.index({ evaluatorComment: 1 })
CVESchema.index({ evaluatorSolution: 1 })
CVESchema.index({ evaluatorImpact: 1 })

const CVE = mongoose.model("CVE", CVESchema)

export default CVE
