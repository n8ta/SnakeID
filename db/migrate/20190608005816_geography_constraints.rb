class GeographyConstraints < ActiveRecord::Migration[5.2]
  def change
    add_index :species_tier1s, [:species_id, :tier1_id], unique: true
    add_index :species_tier2s, [:species_id, :tier2_id], unique: true
    add_index :species_tier3s, [:species_id, :tier3_id], unique: true
  end
end
