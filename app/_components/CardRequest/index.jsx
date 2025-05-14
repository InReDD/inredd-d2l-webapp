"use client";
import React from "react";
import "./style.scss";
import Link from "next/link";
import { Button } from "..";
import { Paragraph2, SubTitle } from "../Typography";
import { CheckBox, Input } from "../Form";

function CardRequest({ className }) {

  const check = [
    {
      title: (
        <Paragraph2>
          Lorem ipsum dolor sit amet, consectetur adipiscing{" "}
          <Link href="#">Use Terms</Link> and{" "}
          <Link href="#">Privacy Policy</Link>
        </Paragraph2>
      ),
    },
  ];

  return (
    <div className={`card-request ${className || ""}`}>
      <SubTitle className="text-center mb-4 fw-bold">Request Access</SubTitle>
      <div className="mt-20">
        <Input
          name="firstName"
          label="First name"
          placeholder="Placeholder"
          required
        />
      </div>
      <div className="input-mail">
        <Input
          name="email"
          label="E-mail"
          placeholder="Placeholder"
          type="email"
          required
        />
      </div>
      <div>
        {check.map((check, index) => (
          <div className="mt-20" key={index}>
            <CheckBox>{check.title}</CheckBox>
          </div>
        ))}
      </div>
      
      <div className="mt-80 d-flex justify-content-center">
        <Button size="medium">
          Request
        </Button>
      </div>  
    </div>
  );
}

export default CardRequest;
