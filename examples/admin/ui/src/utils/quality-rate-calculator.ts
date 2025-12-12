/**
 * 合格率计算工具函数
 */

import type { InspectionRecord } from '../views/quality/common/useInspectionRecords'

/**
 * 计算样本合格率（批量抽检）
 * @param records 质检记录数组
 * @param sampleTotalQuantity 样本总量
 * @returns 样本合格数量、样本合格率
 */
export function calculateSampleQualifiedRate(
  records: InspectionRecord[],
  sampleTotalQuantity?: number
): { qualifiedQuantity: number; qualifiedRate: number } {
  if (!sampleTotalQuantity || sampleTotalQuantity <= 0) {
    return { qualifiedQuantity: 0, qualifiedRate: 0 }
  }

  // 统计合格样本数量（样本合格状态为"合格"的记录数）
  const qualifiedCount = records.filter(
    (record) => record.sampleQualifiedStatus === '合格'
  ).length

  const qualifiedRate = (qualifiedCount / sampleTotalQuantity) * 100

  return {
    qualifiedQuantity: qualifiedCount,
    qualifiedRate: Math.round(qualifiedRate * 100) / 100 // 保留两位小数
  }
}

/**
 * 计算批量合格率（批量全检）
 * @param records 质检记录数组
 * @param batchTotalQuantity 批量总数量
 * @returns 批量合格数量、批量合格率
 */
export function calculateBatchQualifiedRate(
  records: InspectionRecord[],
  batchTotalQuantity?: number
): { qualifiedQuantity: number; qualifiedRate: number } {
  if (!batchTotalQuantity || batchTotalQuantity <= 0) {
    return { qualifiedQuantity: 0, qualifiedRate: 0 }
  }

  // 统计合格个体数量（单件合格状态为"合格"的记录数）
  const qualifiedCount = records.filter(
    (record) => record.individualQualifiedStatus === '合格'
  ).length

  const qualifiedRate = (qualifiedCount / batchTotalQuantity) * 100

  return {
    qualifiedQuantity: qualifiedCount,
    qualifiedRate: Math.round(qualifiedRate * 100) / 100 // 保留两位小数
  }
}

/**
 * 根据抽检判定标准判断整批是否合格
 * @param qualifiedRate 合格率（百分比，如80表示80%）
 * @param threshold 判定标准阈值（如0.95表示95%）
 * @returns 整批判定结果：合格/不合格
 */
export function judgeBatchByThreshold(
  qualifiedRate: number,
  threshold?: number | null
): string {
  if (!threshold) {
    // 如果没有设置阈值，默认使用95%
    threshold = 0.95
  }

  // 将百分比转换为小数进行比较
  const rateDecimal = qualifiedRate / 100
  return rateDecimal >= threshold ? '合格' : '不合格'
}

/**
 * 计算单件质检的合格数量
 * @param records 质检记录数组
 * @returns 合格数量
 */
export function calculateIndividualQualifiedCount(
  records: InspectionRecord[]
): number {
  return records.filter(
    (record) => record.individualQualifiedStatus === '合格'
  ).length
}

/**
 * 根据质检方案配置自动计算合格率
 * @param records 质检记录数组
 * @param qualityPlan 质检方案配置
 * @returns 计算结果
 */
export function calculateQualifiedRateByPlan(
  records: InspectionRecord[],
  qualityPlan: {
    inspectionObjectType?: string // 单件/批量
    inspectionType?: string // 全检/抽检
    fullInspectionStrategy?: string // 统一计算合格率/单件分别记录结果
    samplingThreshold?: number | null // 抽检判定标准
  }
) {
  const { inspectionObjectType, inspectionType, fullInspectionStrategy, samplingThreshold } = qualityPlan

  // 单件质检（无论抽检/全检）
  if (inspectionObjectType === '单件') {
    const totalCount = records.length
    const qualifiedCount = calculateIndividualQualifiedCount(records)
    const qualifiedRate = totalCount > 0 ? (qualifiedCount / totalCount) * 100 : 0

    return {
      totalQuantity: totalCount,
      qualifiedQuantity: qualifiedCount,
      qualifiedRate: Math.round(qualifiedRate * 100) / 100,
      judgmentResult: '' // 单件质检不需要整批判定
    }
  }

  // 批量抽检
  if (inspectionObjectType === '批量' && inspectionType === '抽检') {
    // 从记录中获取样本总量（应该从第一条记录中获取，因为所有记录共享同一个样本总量）
    const sampleTotalQuantity = records[0]?.sampleTotalQuantity || records.length
    const { qualifiedQuantity, qualifiedRate } = calculateSampleQualifiedRate(
      records,
      sampleTotalQuantity
    )
    const judgmentResult = judgeBatchByThreshold(qualifiedRate, samplingThreshold)

    return {
      totalQuantity: sampleTotalQuantity,
      qualifiedQuantity,
      qualifiedRate,
      judgmentResult
    }
  }

  // 批量全检
  if (inspectionObjectType === '批量' && inspectionType === '全检') {
    // 策略A：统一计算合格率
    if (fullInspectionStrategy === '统一计算合格率') {
      const batchTotalQuantity = records[0]?.batchTotalQuantity || records.length
      const { qualifiedQuantity, qualifiedRate } = calculateBatchQualifiedRate(
        records,
        batchTotalQuantity
      )

      return {
        totalQuantity: batchTotalQuantity,
        qualifiedQuantity,
        qualifiedRate,
        judgmentResult: '' // 全检不需要整批判定
      }
    }

    // 策略B：单件分别记录结果
    if (fullInspectionStrategy === '单件分别记录结果') {
      const batchTotalQuantity = records[0]?.batchTotalQuantity || records.length
      const qualifiedQuantity = calculateIndividualQualifiedCount(records)
      const qualifiedRate = batchTotalQuantity > 0 
        ? (qualifiedQuantity / batchTotalQuantity) * 100 
        : 0

      return {
        totalQuantity: batchTotalQuantity,
        qualifiedQuantity,
        qualifiedRate: Math.round(qualifiedRate * 100) / 100,
        judgmentResult: '' // 全检不需要整批判定
      }
    }
  }

  // 默认情况
  return {
    totalQuantity: records.length,
    qualifiedQuantity: 0,
    qualifiedRate: 0,
    judgmentResult: ''
  }
}









