//Open WMI and Remote Access Ports
var firewall = new ActiveXObject("HNetCfg.FwMgr");
var policy = firewall.LocalPolicy.CurrentProfile;
var admin = policy.RemoteAdminSettings;
admin.Enabled = true;