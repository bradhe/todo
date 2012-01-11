module ApplicationHelper
  def mobile?
    request.user_agent.include?("iPhone")
  end
end
