class TodosController < ApplicationController
  def index
    @todos = TodoItem.all.reject { |todo| (todo.updated_at > 1.day.ago) && todo.complete }

    respond_to do |f|
      f.html # index.html
      f.json { render :json => @todos }
    end
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

  def assets
    @todos = TodoItem.all

    respond_to do |f|
      f.appcache
    end
  end

  def list
    @todos = TodoItem.all

    respond_to do |f|
      f.html # index.html
      f.json { render :json => @todos.as_json }
    end
  end

end
