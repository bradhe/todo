module TodosHelper
  def appcache_version
    if File.exist?(Rails.root.join('REVISION'))
      File.read(Rails.root.join('REVISION'))
    else
      Process.pid.to_s
    end
  end
end
