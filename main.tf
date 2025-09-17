provider "aws" {
  region = "ap-south-1" # Mumbai region
}

resource "aws_instance" "portfolio" {
  ami           = "ami-08e5424edfe926b43" # Ubuntu AMI (update as needed)
  instance_type = "t2.micro"

  key_name = "your-keypair" # Replace with your actual keypair name

  security_groups = [aws_security_group.portfolio_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker.io
              systemctl start docker
              docker run -d -p 80:80 your-dockerhub-username/portfolio:latest
              EOF

  tags = {
    Name = "Portfolio-Frontend"
  }
}

resource "aws_security_group" "portfolio_sg" {
  name        = "portfolio-sg"
  description = "Allow HTTP"
  # vpc_id      = "your-vpc-id" # Uncomment and set if using a custom VPC

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "portfolio_public_ip" {
  value = aws_instance.portfolio.public_ip
}
