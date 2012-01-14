module ApplicationHelper
  def mobile?
    request.user_agent.include?("iPhone")
  end

  def include_appcache?
    !!appcache
  end

  def appcache(name=nil)
    @appcache ||= name if name
    @appcache
  end
end
