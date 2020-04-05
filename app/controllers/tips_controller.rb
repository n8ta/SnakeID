class TipsController < ApplicationController
  before_action :require_login
  before_action :admin_only, only: [:destroy, :update, :edit, :new]
  before_action :set_tip, only: [:show, :edit, :update, :destroy]

  def index
    @tips = Tip.all
  end

  def show
  end

  def new
    @tip = Tip.new
  end

  def edit
  end

  def create
    sleep 2.seconds
    @tip = Tip.new(tip_params)
    @tip.taxon = Taxon.find(params[:taxon_id])
    # if current_user.admin_or_contributor?
    #   @tip.approved = true
    # end
    @tip.user = current_user

    respond_to do |format|
      if @tip.save
        format.html { redirect_to @tip, notice: 'Tip was successfully created.' }
        format.json { render :show, status: :created, location: @tip }
      else
        format.html { render :new }
        format.json { render json: @tip.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @tip.update(tip_params)
        format.html { redirect_to @tip, notice: 'Tip was successfully updated.' }
        format.json { render :show, status: :ok, location: @tip }
      else
        format.html { render :edit }
        format.json { render json: @tip.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @tip.destroy
    respond_to do |format|
      format.html { redirect_to taxon_url(@tip.taxon), notice: 'Tip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.

  def set_tip
    @tip = Tip.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def tip_params
    params.require(:tip).permit(:content, :taxon_id)
  end

end
