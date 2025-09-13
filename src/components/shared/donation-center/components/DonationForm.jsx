import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DonationForm = ({ 
  campaign, 
  onSubmit, 
  onClose, 
  paymentMethod, 
  setPaymentMethod, 
  formatCurrency 
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    frequency: 'one-time',
    isAnonymous: false,
    message: '',
    dedicatedTo: '',
    notifyDedicatee: false,
    dedicateeEmail: '',
    coverFees: true
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { value: 'bank', label: 'Bank Transfer', icon: 'Building' },
    { value: 'paypal', label: 'PayPal', icon: 'Wallet' },
    { value: 'mobile', label: 'Mobile Payment', icon: 'Smartphone' }
  ];

  const frequencies = [
    { value: 'one-time', label: 'One-time Donation' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount?.toString(),
      customAmount: ''
    }));
  };

  const handleCustomAmountChange = (value) => {
    setFormData(prev => ({
      ...prev,
      customAmount: value,
      amount: ''
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    const finalAmount = formData?.customAmount || formData?.amount;
    if (!finalAmount || isNaN(parseFloat(finalAmount)) || parseFloat(finalAmount) <= 0) {
      newErrors.amount = 'Please enter a valid donation amount';
    } else if (parseFloat(finalAmount) < 5) {
      newErrors.amount = 'Minimum donation amount is $5';
    }

    if (formData?.dedicatedTo && formData?.notifyDedicatee && !formData?.dedicateeEmail) {
      newErrors.dedicateeEmail = 'Email is required to notify dedicatee';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    const finalAmount = parseFloat(formData?.customAmount || formData?.amount);
    const processingFee = formData?.coverFees ? finalAmount * 0.029 + 0.30 : 0;
    
    const donationData = {
      campaignId: campaign?.id,
      amount: finalAmount,
      processingFee,
      totalAmount: finalAmount + processingFee,
      frequency: formData?.frequency,
      paymentMethod,
      isAnonymous: formData?.isAnonymous,
      message: formData?.message,
      dedicatedTo: formData?.dedicatedTo,
      notifyDedicatee: formData?.notifyDedicatee,
      dedicateeEmail: formData?.dedicateeEmail,
      coverFees: formData?.coverFees
    };
    
    try {
      await onSubmit(donationData);
    } catch (error) {
      console.error('Donation processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const finalAmount = parseFloat(formData?.customAmount || formData?.amount || 0);
  const processingFee = formData?.coverFees ? finalAmount * 0.029 + 0.30 : 0;
  const totalAmount = finalAmount + processingFee;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Donate to {campaign?.title}
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Support this important cause
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Donation Amount
            </label>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {suggestedAmounts?.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={formData?.amount === amount?.toString() ? "default" : "outline"}
                  onClick={() => handleAmountSelect(amount)}
                  className="h-12"
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-secondary">$</span>
              </div>
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={formData?.customAmount}
                onChange={(e) => handleCustomAmountChange(e?.target?.value)}
                className="pl-8"
                min="5"
                step="0.01"
              />
            </div>
            
            {errors?.amount && (
              <p className="mt-2 text-sm text-error">{errors?.amount}</p>
            )}
          </div>

          {/* Donation Frequency */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Donation Frequency
            </label>
            <Select
              value={formData?.frequency}
              onChange={(value) => handleInputChange('frequency', value)}
              options={frequencies}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Payment Method
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods?.map((method) => (
                <Button
                  key={method?.value}
                  type="button"
                  variant={paymentMethod === method?.value ? "default" : "outline"}
                  onClick={() => setPaymentMethod(method?.value)}
                  className="flex items-center justify-start h-12 px-4"
                >
                  <Icon name={method?.icon} size={16} className="mr-2" />
                  {method?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Dedication (Optional) */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Dedicate This Donation (Optional)
            </label>
            
            <Input
              placeholder="In honor/memory of..."
              value={formData?.dedicatedTo}
              onChange={(e) => handleInputChange('dedicatedTo', e?.target?.value)}
              className="mb-3"
            />
            
            {formData?.dedicatedTo && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Checkbox
                    checked={formData?.notifyDedicatee}
                    onChange={(checked) => handleInputChange('notifyDedicatee', checked)}
                  />
                  <span className="ml-2 text-sm text-text-primary">
                    Send notification to dedicatee
                  </span>
                </div>
                
                {formData?.notifyDedicatee && (
                  <Input
                    type="email"
                    placeholder="Dedicatee's email address"
                    value={formData?.dedicateeEmail}
                    onChange={(e) => handleInputChange('dedicateeEmail', e?.target?.value)}
                  />
                )}
                
                {errors?.dedicateeEmail && (
                  <p className="text-sm text-error">{errors?.dedicateeEmail}</p>
                )}
              </div>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Message (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-input rounded-md text-text-primary bg-background resize-none"
              rows="3"
              placeholder="Share why you're supporting this cause..."
              value={formData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
              maxLength="500"
            />
          </div>

          {/* Donation Options */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox
                checked={formData?.isAnonymous}
                onChange={(checked) => handleInputChange('isAnonymous', checked)}
              />
              <span className="ml-2 text-sm text-text-primary">
                Make this donation anonymous
              </span>
            </div>
            
            <div className="flex items-center">
              <Checkbox
                checked={formData?.coverFees}
                onChange={(checked) => handleInputChange('coverFees', checked)}
              />
              <div className="ml-2">
                <span className="text-sm text-text-primary">
                  Cover processing fees ({formatCurrency(processingFee)})
                </span>
                <p className="text-xs text-text-secondary">
                  This ensures 100% of your donation goes to the cause
                </p>
              </div>
            </div>
          </div>

          {/* Donation Summary */}
          {finalAmount > 0 && (
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-3">Donation Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Donation Amount:</span>
                  <span className="text-text-primary">{formatCurrency(finalAmount)}</span>
                </div>
                
                {formData?.coverFees && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Processing Fee:</span>
                    <span className="text-text-primary">{formatCurrency(processingFee)}</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-2 flex justify-between font-medium">
                  <span className="text-text-primary">Total Amount:</span>
                  <span className="text-text-primary">{formatCurrency(totalAmount)}</span>
                </div>
                
                {formData?.frequency !== 'one-time' && (
                  <div className="pt-2 text-xs text-text-secondary">
                    This amount will be charged {formData?.frequency === 'monthly' ? 'every month' : 
                    formData?.frequency === 'quarterly' ? 'every quarter' : 'annually'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isProcessing || !finalAmount}
              loading={isProcessing}
              iconName="Heart"
              iconPosition="left"
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : `Donate ${formatCurrency(totalAmount)}`}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>

          {/* Security Notice */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <div className="flex items-center">
              <Icon name="Shield" size={16} className="text-success mr-2" />
              <div>
                <p className="text-sm font-medium text-success">Secure Donation</p>
                <p className="text-xs text-success/80">
                  Your payment information is encrypted and secure. You'll receive a receipt via email.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;