// Ship-fee discount tiers. The shop quotes the actual ship fee; the site only shows the discount.
export const shipTiers = [
  { minTotal: 130000, discount: 10000 },
  { minTotal: 250000, discount: 20000 },
]

export function shipDiscountFor(total: number) {
  let discount = 0
  for (const t of shipTiers) if (total >= t.minTotal) discount = t.discount
  return discount
}

export function nextShipTier(total: number) {
  return shipTiers.find((t) => total < t.minTotal) ?? null
}
