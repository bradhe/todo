class TodosController < ApplicationController
  def index
    @todos = TodoItem.all
  end

  def create
    @todo = TodoItem.create(params[:todo])

    if @todo.valid?
      render :json => @todo.as_json
    else
      render :json => @todo.errors, :status => :unprocessable_entity
    end
  end

  def update
    @todo = TodoItem.find(params[:id])

    if @todo.update_attributes(params[:todo])
      render :json => @todo.as_json
    else
      render :json => @todo.errors, :status => :unprocessable_entity
    end
  end
end
