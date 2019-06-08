json.extract! tier1, :id, :name
json.url tier1_url(tier1, format: :json)

json.tier2s tier1.tier2s.each do | t2 |
  json.id t2.id
  json.name t2.name
  json.url tier2_url(t2.id, format: :json )

end