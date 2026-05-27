# Cloudflare 521 Runbook

Cloudflare 521 means Cloudflare reached the edge for `manateewatch.com`, then the origin refused the TCP connection. For this app, Cloudflare should be able to reach the EC2 host on ports `80` and `443`; nginx then proxies to the `frontend` and `backend` Docker services.

## Fast Recovery

Run these on the EC2 instance:

```bash
cd /home/ubuntu
sudo docker-compose ps
sudo docker-compose logs --tail=120 nginx
sudo docker-compose up -d
curl -I http://127.0.0.1/healthz
curl -kI https://127.0.0.1/healthz
```

If `nginx` is not running, restart the stack and re-check logs:

```bash
sudo docker-compose pull
sudo docker-compose up -d
sudo docker-compose logs --tail=120 nginx
```

## What To Check

- EC2 instance state: the instance must be running and reachable.
- EC2 security group: inbound TCP `80` and `443` must be allowed from Cloudflare IP ranges, or temporarily from `0.0.0.0/0` while testing.
- Host firewall: `ufw`, `iptables`, `fail2ban`, or another firewall must not block Cloudflare IPs.
- Docker ports: `sudo docker-compose ps` should show nginx publishing `0.0.0.0:80->80/tcp` and `0.0.0.0:443->443/tcp`.
- Nginx config and cert mounts: `sudo docker-compose exec nginx nginx -t` should pass, and `/etc/nginx/ssl/ssl_cert.pem` plus `/etc/nginx/ssl/ssl_cert_key.key` must exist inside the container.
- Cloudflare DNS: `manateewatch.com` and `www.manateewatch.com` should point to the EC2 public IP as proxied DNS records.
- Cloudflare SSL/TLS mode: use `Full (strict)` with the Cloudflare Origin certificate installed on nginx.

## Useful Commands

From your laptop:

```bash
curl -I https://manateewatch.com
dig +short manateewatch.com
```

From EC2, replace `ORIGIN_PUBLIC_IP` with the EC2 public IP:

```bash
curl -I http://ORIGIN_PUBLIC_IP/healthz
curl -kI https://ORIGIN_PUBLIC_IP/healthz
sudo ss -ltnp | grep -E ':80|:443'
```

If direct origin checks pass but Cloudflare still returns 521, the likely cause is a Cloudflare IP allowlist/firewall issue. Update the EC2 security group or host firewall using Cloudflare's current IP ranges: https://www.cloudflare.com/ips/
