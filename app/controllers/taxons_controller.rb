class TaxonsController < ApplicationController
  before_action :set_taxon, only: [:show, :edit, :update, :destroy]

  def show
    @taxons = @taxon.taxons
  end

  def index
    @taxons = Taxon.where(taxon: nil)
  end


  private

  # Use callbacks to share common setup or constraints between actions.
  def set_taxon
    @taxon = Taxon.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def region_params
    params.require(:taxon).permit(:name)
  end
end